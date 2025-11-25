import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Award, 
  Calendar,
  Shield,
  FileText,
  Download
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    avgPretest: 0,
    avgPosttest: 0,
    completionRate: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (profilesError) throw profilesError;

        // Fetch all exam scores
        const { data: scores, error: scoresError } = await supabase
          .from('exam_scores')
          .select('*');

        if (scoresError) throw scoresError;

        // Combine data
        let totalPretest = 0;
        let totalPosttest = 0;
        let pretestCount = 0;
        let posttestCount = 0;

        const combinedData = profiles.map(profile => {
          const userScores = scores?.filter(score => score.user_id === profile.id) || [];
          const pretest = userScores.find(s => s.exam_type === 'pretest');
          const posttest = userScores.find(s => s.exam_type === 'posttest');

          if (pretest) {
            totalPretest += (pretest.score / pretest.total_items) * 100;
            pretestCount++;
          }
          if (posttest) {
            totalPosttest += (posttest.score / posttest.total_items) * 100;
            posttestCount++;
          }

          return {
            ...profile,
            pretestScore: pretest,
            posttestScore: posttest,
            pretest: pretest ? `${pretest.score}/${pretest.total_items}` : '-',
            posttest: posttest ? `${posttest.score}/${posttest.total_items}` : '-'
          };
        });

        setUsers(combinedData);
        setStats({
          totalUsers: profiles.length,
          avgPretest: pretestCount ? Math.round(totalPretest / pretestCount) : 0,
          avgPosttest: posttestCount ? Math.round(totalPosttest / posttestCount) : 0,
          completionRate: profiles.length ? Math.round((posttestCount / profiles.length) * 100) : 0
        });

      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Email', 'Role', 'Pre-test Score', 'Post-test Score', 'Joined Date'];
    
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.email,
        user.role,
        user.pretest,
        user.posttest,
        new Date(user.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `student_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, icon, color, subtext }) => {
    const Icon = icon;
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon size={24} className="text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-800">{value}</span>
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of student progress and performance</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users} 
            color="bg-blue-500"
            subtext="Registered students"
          />
          <StatCard 
            title="Avg. Pre-test" 
            value={`${stats.avgPretest}%`} 
            icon={FileText} 
            color="bg-amber-500"
            subtext="Initial assessment"
          />
          <StatCard 
            title="Avg. Post-test" 
            value={`${stats.avgPosttest}%`} 
            icon={TrendingUp} 
            color="bg-green-500"
            subtext="Final assessment"
          />
          <StatCard 
            title="Completion Rate" 
            value={`${stats.completionRate}%`} 
            icon={Award} 
            color="bg-purple-500"
            subtext="Finished course"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header & Search */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Student Directory</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd201c]/20 focus:border-[#cd201c] w-full sm:w-64 transition-all"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin w-8 h-8 border-4 border-[#cd201c] border-t-transparent rounded-full mx-auto mb-4"></div>
              Loading data...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="p-4 border-b border-gray-100">User</th>
                    <th className="p-4 border-b border-gray-100">Role</th>
                    <th className="p-4 border-b border-gray-100">Pre-test Score</th>
                    <th className="p-4 border-b border-gray-100">Post-test Score</th>
                    <th className="p-4 border-b border-gray-100">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#cd201c]/10 text-[#cd201c] flex items-center justify-center font-bold text-sm">
                              {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.email}</p>
                              <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' ? <Shield size={12} className="mr-1" /> : null}
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          {user.pretestScore ? (
                            <div className="flex items-center gap-2">
                              <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${(user.pretestScore.score / user.pretestScore.total_items) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 font-medium">{user.pretest}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 italic">Not taken</span>
                          )}
                        </td>
                        <td className="p-4">
                          {user.posttestScore ? (
                            <div className="flex items-center gap-2">
                              <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${(user.posttestScore.score / user.posttestScore.total_items) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 font-medium">{user.posttest}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 italic">Not taken</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(user.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No users found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
