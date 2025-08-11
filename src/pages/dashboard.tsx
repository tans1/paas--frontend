import { FolderOpen, Activity, DollarSign, Calendar, ArrowRight, Github, ExternalLink, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { useUserStore } from '../store/userStore';
import Lottie from 'lottie-react';
import loadingAnimation from '../lottie/loadinganimation.json';
import api from '../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    fetchProjects,
    projects,
    loading,
    connectGithub,
    fetchPaymentDetails,
    fetchedPaymentDetails,
  } = useDashboardStore();
  const { fetchUserProfile, user } = useUserStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchPaymentDetails();
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [fetchPaymentDetails]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        await fetchProjects();
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setTimeout(() => setShowLoader(false), 2000);
      }
    };
    fetchAllProjects();
  }, [fetchProjects]);

  const handleProjectClick = (projectName?: string) => {
    if (projectName) {
      // If projectName passed, navigate to project detail page
      navigate(`/dashboard/projects/${projectName}`);
    } else {
      // Otherwise navigate to all projects list
      navigate('/dashboard/projects');
    }
  };

  const handleGithubConnect = async () => {
    try {
      const githubUrl = await connectGithub();
      if (githubUrl) {
        window.location.href = githubUrl;
      }
    } catch (error) {
      console.error('Error connecting to GitHub:', error);
    }
  };

  const handlePayButton = async () => {
    try {
      const { data } = await api.get('/payment/link');
      if (data?.paymentUrl) {
        window.open(data.paymentUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || showLoader) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center ">
        <div className="w-[10%] h-full m-auto flex flex-col justify-center">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 -mx-8 -mt-8 px-8 pt-8 pb-16 text-white flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex gap-4">
            {!user?.githubUsername && (
              <button
                onClick={handleGithubConnect}
                className="flex items-center gap-2 bg-[#24292F] text-white px-6 py-2 rounded-md hover:bg-[#1B1F23] transition-colors shadow-sm"
              >
                <Github className="w-5 h-5" />
                Connect GitHub
              </button>
            )}
            <button
              onClick={() => handleProjectClick()}
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              All Projects
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-10 mb-8">
        {/* Total Projects Card */}
        <div className="bg-white rounded-lg shadow-lg border-0 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="text-sm font-medium text-gray-600">Total Projects</div>
            <FolderOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-3xl font-bold">{projects.length}</div>
            {/* Optionally add dynamic subtitle here */}
          </div>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white rounded-lg shadow-lg border-0 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="text-sm font-medium text-gray-600">Active Projects</div>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-3xl font-bold">{projects.filter(p => p.status === 'RUNNING').length}</div>
            <p className="text-xs text-gray-500 mt-1">Currently running</p>
          </div>
        </div>

        {/* Billing Status Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-lg border-0 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="text-sm font-medium text-green-700">Billing Status</div>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                {fetchedPaymentDetails?.currentPaymentAmount
                  ? `${fetchedPaymentDetails.currentPaymentAmount} Birr Estimated`
                  : 'No Bills Estimated'}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Next Payment:</span>
                <span>
                  {fetchedPaymentDetails?.nextPaymentDate
                    ? new Date(fetchedPaymentDetails.nextPaymentDate).toDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Amount:</span>
                <span>{fetchedPaymentDetails?.previousAmount ?? 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="border border-gray-300 px-2 py-0.5 rounded text-xs">
                  {fetchedPaymentDetails?.currentStatus ?? 'N/A'}
                </span>
              </div>
            </div>
            {['PENDING', 'OVERDUE', ''].includes(fetchedPaymentDetails?.currentStatus ?? '') && (
              <button
                className="mt-4 px-4 py-1 cursor-pointer rounded-sm bg-green-600 text-white font-semibold"
                onClick={handlePayButton}
              >
                Pay
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Projects List */}
      <div className="bg-white rounded-lg shadow-lg border-0">
        <div className="p-6 pb-4 flex justify-between items-center">
          <div className="text-lg font-medium">Active Projects</div>
          <button
            onClick={() => navigate('/dashboard/project/add')}
            className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>
        <div className="px-6 pb-6">
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(project.createdAt).toDateString()}
                        </span>
                        <span className="border border-gray-300 px-2 py-0.5 rounded text-xs">
                          {project.framework ?? 'N/A'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            project.status === 'RUNNING'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 px-2 py-1 text-sm flex items-center transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </a>
                    <button className="text-gray-600 hover:text-gray-800 px-2 py-1 text-sm flex items-center transition-colors">
                      <Github className="w-3 h-3 mr-1" />
                      GitHub
                    </button>
                    <button
                      onClick={() => handleProjectClick(project.name)}
                      className="border border-gray-300 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                    >
                      Configure
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No active projects yet</p>
              <button
                onClick={() => navigate('/dashboard/project/add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create your first project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
