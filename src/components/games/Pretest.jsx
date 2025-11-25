import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {ArrowLeft, RefreshCw, Check, X, Clock, BookOpen, SkipForward, ChevronLeft, ChevronRight, FastForward} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {PRETEST_DATA} from '../../data/pretestData';
import {playSound, playBackgroundMusic, stopBackgroundMusic} from '../../utils/soundManager';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';

const Pretest = ({onComplete}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  useEffect(() => {
    const checkPretestStatus = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('exam_scores')
          .select('*')
          .eq('user_id', user.id)
          .eq('exam_type', 'pretest')
          .single();
          
        if (data) {
          setAlreadyTaken(true);
          setScore(data.score);
        }
      } catch (error) {
        // Ignore error if no row found (it means not taken yet)
      } finally {
        setCheckingStatus(false);
      }
    };
    
    checkPretestStatus();
  }, [user]);

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
      console.log('Answer selected:', questionId, answerIndex, newAnswers);
      return newAnswers;
    });

    // Remove from skipped questions when answered
    setSkippedQuestions((prev) => {
      const newSkipped = new Set(prev);
      newSkipped.delete(questionId);
      return newSkipped;
    });

    playSound('flip');
  };

  const handleSkipQuestion = () => {
    const currentQ = PRETEST_DATA.questions[currentQuestion];
    setSkippedQuestions((prev) => new Set([...prev, currentQ.id]));
    playSound('flip');

    // Move to next question
    if (currentQuestion < PRETEST_DATA.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If at the last question, go to first unanswered question
      const firstUnanswered = findFirstUnansweredQuestion();
      if (firstUnanswered !== -1) {
        setCurrentQuestion(firstUnanswered);
      }
    }
  };

  const handleSkipWholePretest = () => {
    playSound('complete');
    if (onComplete) {
      onComplete();
    } else {
      navigate('/entertainment');
    }
  };

  const handleShowSkipConfirmation = () => {
    setShowSkipConfirmation(true);
  };

  const handleCancelSkip = () => {
    setShowSkipConfirmation(false);
  };

  const findFirstUnansweredQuestion = () => {
    for (let i = 0; i < PRETEST_DATA.questions.length; i++) {
      const questionId = PRETEST_DATA.questions[i].id;
      if (!(questionId in answers)) {
        return i;
      }
    }
    return -1; // All questions answered
  };

  const handleComplete = async () => {
    let correctAnswers = 0;
    PRETEST_DATA.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    // Store raw score instead of percentage
    const finalScore = correctAnswers;
    setScore(finalScore);
    setIsComplete(true);
    playSound('complete');

    if (user) {
      try {
        const { error } = await supabase.from('exam_scores').insert({
          user_id: user.id,
          exam_type: 'pretest',
          score: finalScore,
          total_items: PRETEST_DATA.questions.length,
          created_at: new Date().toISOString()
        });
        
        if (error) {
          console.error('Supabase error saving score:', error);
          alert('Failed to save score: ' + error.message);
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
    setSkippedQuestions(new Set());
    setTimeLeft(1800);
    setIsComplete(false);
    setShowResults(false);
    setScore(0);
    setShowExplanation(false);
    setShowSkipConfirmation(false);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      playSound('flip');
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < PRETEST_DATA.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      playSound('flip');
    }
  };

  const currentQ = PRETEST_DATA.questions[currentQuestion];
  const totalQuestions = PRETEST_DATA.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const skippedCount = skippedQuestions.size;
  const unansweredCount = totalQuestions - answeredQuestions;

  const renderSkipConfirmation = () => (
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full shadow-xl'>
        <div className='text-center'>
          <div className='text-4xl mb-4'>⚠️</div>
          <h3 className='text-xl font-bold text-[#6B3100] mb-4'>Laktawan ang Buong Pagsusulit?</h3>
          <p className='text-gray-600 mb-6 text-sm'>
            Sigurado ka bang gusto mong laktawan ang pagsusulit? Hindi mo makakamtan ang mga benefit ng pag-assess sa inyong kaalaman tungkol sa Sinaunang Tsina.
          </p>
          <div className='flex gap-3 justify-center'>
            <button onClick={handleCancelSkip} className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'>
              Magpatuloy sa Pagsusulit
            </button>
            <button onClick={handleSkipWholePretest} className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2'>
              Oo, Laktawan
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderQuestion = () => (
    <motion.div key={currentQuestion} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} className='space-y-6'>
      <div className='bg-white rounded-lg p-6 shadow-md'>
        <div className='flex justify-between items-start mb-4'>
          <h3 className='text-lg font-semibold text-[#6B3100] flex-1'>
            {currentQuestion + 1}. {currentQ.question}
          </h3>
          {skippedQuestions.has(currentQ.id) && <span className='bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full ml-2'>Nilaktawan</span>}
        </div>

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

      {/* Navigation buttons */}
      <div className='flex justify-between items-center'>
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentQuestion === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#6B3100] hover:bg-[#6B3100]/10'}`}
        >
          <ChevronLeft size={16} />
          Nauna
        </button>

        <div className='flex gap-2'>

          {currentQuestion < totalQuestions - 1 ? (
            <button onClick={goToNextQuestion} className='px-6 py-2 bg-[#6B3100] text-white rounded-lg hover:bg-[#6B3100]/90 flex items-center gap-2'>
              Susunod
              <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleComplete} className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
              Tapusin ang Pagsusulit
            </button>
          )}
        </div>
      </div>

      {/* Question status summary */}
      {(skippedCount > 0 || unansweredCount > answeredQuestions) && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex flex-wrap gap-4 text-sm'>
            <span className='text-green-600 font-medium'>✓ {answeredQuestions} Nasagot</span>
            {skippedCount > 0 && <span className='text-orange-600 font-medium'>⏭ {skippedCount} Nilaktawan</span>}
            {unansweredCount > answeredQuestions && <span className='text-gray-600 font-medium'>○ {unansweredCount - skippedCount} Hindi pa nasasagot</span>}
          </div>
          {(skippedCount > 0 || unansweredCount > answeredQuestions) && (
            <p className='text-xs text-blue-600 mt-2'>💡 Maaari mong bumalik sa mga tanong na nilaktawan o hindi pa nasasagot bago tapusin ang pagsusulit.</p>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderResults = () => (
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className='space-y-6'>
      <div className='bg-white rounded-lg p-6 shadow-md text-center'>
        <h2 className='text-2xl font-bold text-[#6B3100] mb-4'>🎉 Natapos ang Pagsusulit!</h2>

        <div className='text-6xl font-bold mb-4'>{score}/{totalQuestions}</div>

        <div className='grid grid-cols-3 gap-4 mb-6 text-sm'>
          <div className='bg-green-50 p-3 rounded-lg'>
            <div className='text-green-600 font-bold text-lg'>{answeredQuestions}</div>
            <div className='text-gray-600'>Nasagot</div>
          </div>
          <div className='bg-orange-50 p-3 rounded-lg'>
            <div className='text-orange-600 font-bold text-lg'>{skippedCount}</div>
            <div className='text-gray-600'>Nilaktawan</div>
          </div>
          <div className='bg-gray-50 p-3 rounded-lg'>
            <div className='text-gray-600 font-bold text-lg'>{totalQuestions - answeredQuestions}</div>
            <div className='text-gray-600'>Hindi nasagot</div>
          </div>
        </div>

        <div className='flex justify-center gap-4 flex-wrap'>
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
    </motion.div>
  );

  const renderAnswerReview = () => (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='space-y-4'>
      <div className='bg-white rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-bold text-[#6B3100] mb-4'>📚 Mga Sagot at Paliwanag</h2>

        <div className='space-y-6 max-h-96 overflow-y-auto'>
          {PRETEST_DATA.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasSkipped = skippedQuestions.has(question.id);
            const correctAnswerText = question.options[question.correctAnswer];
            const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : wasSkipped ? 'Nilaktawan' : 'Hindi nasagot';

            return (
              <div key={question.id} className='border-b border-gray-200 pb-4'>
                <div className='flex items-start gap-3'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      userAnswer === undefined ? 'bg-gray-400' : isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {userAnswer === undefined ? '?' : isCorrect ? <Check size={16} /> : <X size={16} />}
                  </div>

                  <div className='flex-1'>
                    <h4 className='font-semibold text-[#6B3100] mb-2'>
                      {index + 1}. {question.question}
                    </h4>

                    <div className='space-y-1 text-sm'>
                      <p className='text-gray-600'>
                        <span className='font-medium'>Inyong sagot:</span> <span className={wasSkipped ? 'text-orange-600' : ''}>{userAnswerText}</span>
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

        <div className='mt-6 flex justify-center'>
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
    return (
      <div className='min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
          <h2 className='text-2xl font-bold text-[#6B3100] mb-4'>🎉 Natapos na ang Pagsusulit!</h2>
          <p className='text-gray-600 mb-6'>
            Natapos mo na ang pretest. Ang iyong score ay:
          </p>
          <div className='text-6xl font-bold text-[#6B3100] mb-8'>{score}/{PRETEST_DATA.questions.length}</div>
          <button 
            onClick={() => navigate('/entertainment')} 
            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto'
          >
            Magpatuloy 🚀
          </button>
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

          <div className='flex gap-2'>
            {!isComplete && (
              <>
                <button onClick={handleReset} className='flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base'>
                  <RefreshCw size={16} className='sm:w-5 sm:h-5' />
                  <span className='hidden sm:inline'>I-reset</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-3 sm:p-6'>
          <div className='text-center mb-6'>
            <h1 className='text-xl sm:text-3xl font-bold text-[#6B3100] mb-2'>🧠 Pagsusulit sa Sinaunang Tsina</h1>
            <p className='text-sm sm:text-base text-gray-600 mb-2'>Subukan ang inyong kaalaman tungkol sa sinaunang kabihasnang Tsina!</p>
            <p className='text-xs sm:text-sm text-gray-500'>Piliin ang tamang sagot sa bawat tanong. Maaari ninyong laktawan ang mga tanong at bumalik dito mamaya, o i-skip ang buong pretest.</p>
          </div>

          {/* Progress bar */}
          {!isComplete && (
            <div className='mb-6'>
              <div className='flex justify-between text-sm text-gray-600 mb-2'>
                <span>
                  Tanong: {currentQuestion + 1}/{totalQuestions}
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

          {/* Content */}
          {!isComplete && renderQuestion()}
          {isComplete && !showResults && renderResults()}
          {isComplete && showResults && renderAnswerReview()}
        </div>
      </div>

      {/* Skip confirmation modal */}
      {showSkipConfirmation && renderSkipConfirmation()}
    </div>
  );
};

export default Pretest;
