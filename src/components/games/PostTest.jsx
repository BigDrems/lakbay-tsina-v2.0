import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {ArrowLeft, RefreshCw, Check, X, BookOpen, Trophy, RotateCcw} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {POSTTEST_DATA} from '../../data/postTest';
import {playSound, playBackgroundMusic, stopBackgroundMusic} from '../../utils/soundManager';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';

const PostTest = ({onComplete}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  useEffect(() => {
    const checkPostTestStatus = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('exam_scores')
          .select('*')
          .eq('user_id', user.id)
          .eq('exam_type', 'posttest');
          
        if (data && data.length > 0) {
          // Use the most recent score if multiple exist
          const latestScore = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
          setAlreadyTaken(true);
          setScore(latestScore.score);
          setCorrectAnswers(latestScore.score);
        }
      } catch (error) {
        console.error('Error checking status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };
    
    checkPostTestStatus();
  }, [user]);

  // Load score history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('posttest_scores');
    if (savedHistory) {
      setScoreHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save score to history
  const saveScoreToHistory = (newScore, correctCount) => {
    const timestamp = new Date().toLocaleString('tl-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newScoreEntry = {
      score: newScore,
      date: timestamp,
      questions: POSTTEST_DATA.questions.length,
      correct: correctCount,
      answered: Object.keys(answers).length,
    };

    const updatedHistory = [newScoreEntry, ...scoreHistory].slice(0, 10); // Keep only last 10 scores
    setScoreHistory(updatedHistory);
    localStorage.setItem('posttest_scores', JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    if (alreadyTaken || checkingStatus) return;

    // Start background music when component mounts
    playBackgroundMusic();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup: stop background music and timer when component unmounts
    return () => {
      clearInterval(timer);
      stopBackgroundMusic();
    };
  }, [alreadyTaken, checkingStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [questionId]: answerIndex,
      };
      return newAnswers;
    });
    playSound('flip');
  };

  const handleComplete = async () => {
    let correctCount = 0;
    POSTTEST_DATA.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    // Calculate percentage for pass/fail logic
    const percentageScore = Math.round((correctCount / POSTTEST_DATA.questions.length) * 100);
    
    // Store raw score
    const finalScore = correctCount;
    setScore(finalScore);
    setCorrectAnswers(correctCount);

    // Save score to history (using raw score now)
    saveScoreToHistory(finalScore, correctCount);

    // Play appropriate sound based on score (75% passing rate)
    if (percentageScore >= 75) {
      playSound('success');
    } else {
      playSound('fail');
    }

    setIsComplete(true);

    if (user) {
      try {
        // Check if score exists
        const { data: existingScores } = await supabase
          .from('exam_scores')
          .select('id')
          .eq('user_id', user.id)
          .eq('exam_type', 'posttest')
          .order('created_at', { ascending: false });

        if (existingScores && existingScores.length > 0) {
          // Update existing score (most recent one)
          const { error } = await supabase
            .from('exam_scores')
            .update({
              score: finalScore,
              total_items: POSTTEST_DATA.questions.length,
              created_at: new Date().toISOString()
            })
            .eq('id', existingScores[0].id);

          if (error) {
            console.error('Supabase update error:', error);
            throw error;
          }
        } else {
          // Insert new score
          const { error } = await supabase.from('exam_scores').insert({
            user_id: user.id,
            exam_type: 'posttest',
            score: finalScore,
            total_items: POSTTEST_DATA.questions.length,
            created_at: new Date().toISOString()
          });
          
          if (error) throw error;
        }
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/entertainment');
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
    setIsComplete(false);
    setShowResults(false);
    setScore(0);
    setCorrectAnswers(0);
    setShowExplanation(false);
  };

  const handleRetake = () => {
    setAlreadyTaken(false);
    handleReset();
  };

  const getScoreMessage = (rawScore) => {
    const percentage = (rawScore / POSTTEST_DATA.questions.length) * 100;
    if (percentage >= 75) {
      return {
        message: 'Pagpupugay, ikaw ay PASADO!',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: '🎉',
      };
    } else {
      return {
        message: 'Malapit na! Pag-aralang muli!',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '📚',
      };
    }
  };

  const currentQ = POSTTEST_DATA.questions[currentQuestion];
  const totalQuestions = POSTTEST_DATA.questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const renderQuestion = () => (
    <motion.div key={currentQuestion} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} className='space-y-6'>
      <div className='bg-white rounded-lg p-6 shadow-md'>
        <h3 className='text-lg font-semibold text-[#6B3100] mb-4'>{currentQ.question}</h3>

        <div className='space-y-3'>
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                answers[currentQ.id] === index ? 'border-[#6B3100] bg-[#6B3100]/10' : 'border-gray-200 hover:border-[#6B3100]/50 hover:bg-[#6B3100]/5'
              }`}
            >
              <span className='font-medium text-[#6B3100] mr-3'>{String.fromCharCode(65 + index)}.</span>
              <span className='text-gray-700'>{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        {currentQuestion < totalQuestions - 1 ? (
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className='px-6 py-3 bg-[#6B3100] text-white rounded-lg hover:bg-[#6B3100]/90'>
            Susunod
          </button>
        ) : (
          <button onClick={handleComplete} className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700'>
            Tapusin ang Post-test
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderResults = () => {
    const scoreMessage = getScoreMessage(score);

    return (
      <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className='space-y-6'>
        <div className='bg-white rounded-lg p-6 shadow-md text-center'>
          <h2 className='text-2xl font-bold text-[#6B3100] mb-4'>
            <Trophy className='inline-block mr-2' size={24} />
            Natapos ang Post-test!
          </h2>

          <div className='text-6xl font-bold mb-4'>{score}/{totalQuestions}</div>

          <div className={`p-4 rounded-lg mb-6 ${scoreMessage.bgColor} ${scoreMessage.borderColor} border-2`}>
            <p className={`text-xl font-semibold ${scoreMessage.color}`}>
              {scoreMessage.icon} {scoreMessage.message}
            </p>
          </div>

          <p className='text-gray-600 mb-6'>
            {correctAnswers} sa {totalQuestions} sagot ang tama
          </p>

          <div className='flex flex-wrap justify-center gap-4'>
            <button onClick={handleShowResults} className='px-6 py-3 bg-[#6B3100] text-white rounded-lg hover:bg-[#6B3100]/90 flex items-center gap-2'>
              <BookOpen size={16} />
              Tingnan ang mga Sagot
            </button>
            <button onClick={handleContinue} className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2'>
              Magpatuloy 🚀
            </button>
            <button onClick={handleReset} className='px-6 py-3 border border-[#6B3100] text-[#6B3100] rounded-lg hover:bg-[#6B3100]/10 flex items-center gap-2'>
              <RefreshCw size={16} />
              Ulitin
            </button>
          </div>
        </div>

        {scoreHistory.length > 0 && (
          <div className='bg-white rounded-lg p-6 shadow-md'>
            <h3 className='text-lg font-bold text-[#6B3100] mb-4 flex items-center gap-2'>📊 Kasaysayan ng mga Marka</h3>
            <div className='space-y-2 max-h-48 overflow-y-auto'>
              {scoreHistory.map((entry, index) => (
                <div key={index} className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <div>
                    <span className={`font-semibold ${entry.score >= (entry.questions * 0.75) ? 'text-green-600' : 'text-red-600'}`}>{entry.score}/{entry.questions}</span>
                    <span className='text-gray-500 ml-2'>
                      ({entry.correct || 0}/{entry.questions}) tamang sagot
                    </span>
                  </div>
                  <span className='text-sm text-gray-500'>{entry.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderAnswerReview = () => (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='space-y-4'>
      <div className='bg-white rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-bold text-[#6B3100] mb-4'>📚 Mga Sagot at Paliwanag</h2>

        <div className='space-y-6 max-h-96 overflow-y-auto'>
          {POSTTEST_DATA.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;

            const correctAnswerText = question.options[question.correctAnswer];
            const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : 'Hindi nasagot';

            return (
              <div key={question.id} className='border-b border-gray-200 pb-4'>
                <div className='flex items-start gap-3'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      isCorrect ? 'bg-green-500' : userAnswer !== undefined ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                  >
                    {isCorrect ? <Check size={16} /> : userAnswer !== undefined ? <X size={16} /> : '?'}
                  </div>

                  <div className='flex-1'>
                    <h4 className='font-semibold text-[#6B3100] mb-2'>
                      {index + 1}. {question.question}
                    </h4>

                    <div className='space-y-1 text-sm'>
                      <p className='text-gray-600'>
                        <span className='font-medium'>Inyong sagot:</span> <span className={userAnswer === undefined ? 'text-red-600 font-medium' : ''}>{userAnswerText}</span>
                      </p>
                      <p className='text-gray-600'>
                        <span className='font-medium'>Tamang sagot:</span> {correctAnswerText}
                      </p>
                    </div>

                    <div className='mt-3 p-3 bg-amber-50 rounded-lg'>
                      <p className='text-sm text-amber-800'>
                        <span className='font-medium'>Paliwanag:</span> {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-6 flex justify-center gap-4'>
          <button onClick={() => setShowResults(false)} className='px-6 py-3 border border-[#6B3100] text-[#6B3100] rounded-lg hover:bg-[#6B3100]/10 flex items-center gap-2'>
            <RotateCcw size={16} />
            Bumalik sa Resulta
          </button>
          <button onClick={handleContinue} className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2'>
            Magpatuloy
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B3100] mx-auto mb-4"></div>
          <p className="text-[#6B3100]">Checking status...</p>
        </div>
      </div>
    );
  }

  if (alreadyTaken) {
    const scoreMessage = getScoreMessage(score);
    return (
      <div className='min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
          <h2 className='text-2xl font-bold text-[#6B3100] mb-4'>
            <Trophy className='inline-block mr-2' size={24} />
            Natapos na ang Post-test!
          </h2>
          <p className='text-gray-600 mb-6'>
            Natapos mo na ang post-test. Ang iyong score ay:
          </p>
          <div className='text-6xl font-bold text-[#6B3100] mb-4'>{score}/{POSTTEST_DATA.questions.length}</div>
          
          <div className={`p-4 rounded-lg mb-6 ${scoreMessage.bgColor} ${scoreMessage.borderColor} border-2`}>
            <p className={`text-xl font-semibold ${scoreMessage.color}`}>
              {scoreMessage.icon} {scoreMessage.message}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <button 
              onClick={() => navigate('/entertainment')} 
              className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2'
            >
              Magpatuloy 🚀
            </button>
            <button 
              onClick={handleRetake} 
              className='px-6 py-3 border border-[#6B3100] text-[#6B3100] rounded-lg hover:bg-[#6B3100]/10 flex items-center justify-center gap-2'
            >
              <RefreshCw size={16} />
              Kumuha Ulit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-row justify-between items-center mb-4 gap-2'>
          {!onComplete && (
            <button onClick={() => navigate('/entertainment')} className='flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base' aria-label='Bumalik'>
              <ArrowLeft size={16} className='sm:w-5 sm:h-5' />
              <span className='hidden sm:inline'>Bumalik</span>
            </button>
          )}

          {!isComplete && (
            <button onClick={handleReset} className='flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base'>
              <RefreshCw size={16} className='sm:w-5 sm:h-5' />
              <span className='hidden sm:inline'>I-reset</span>
            </button>
          )}
        </div>

        <div className='bg-white rounded-lg shadow-lg p-3 sm:p-6'>
          <div className='text-center mb-6'>
            <h1 className='text-xl sm:text-3xl font-bold text-[#6B3100] mb-2'>🎯 Post-test sa Sinaunang Tsina</h1>
            <p className='text-sm sm:text-base text-gray-600 mb-2'>Ipakita ang inyong natutunang kaalaman tungkol sa sinaunang kabihasnang Tsina!</p>
            <p className='text-xs sm:text-sm text-gray-500'>Piliin ang tamang sagot sa bawat tanong</p>
          </div>

          {!isComplete && (
            <div className='mb-6'>
              <div className='flex justify-between text-sm text-gray-600 mb-2'>
                <span>
                  Mga Nasagot: {answeredQuestions}/{totalQuestions}
                </span>
                <span>Oras: {formatTime(timeLeft)}</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-[#6B3100] h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${(answeredQuestions / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {!isComplete && renderQuestion()}
          {isComplete && !showResults && renderResults()}
          {isComplete && showResults && renderAnswerReview()}
        </div>
      </div>
    </div>
  );
};

export default PostTest;
