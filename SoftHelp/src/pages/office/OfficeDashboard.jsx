import DashboardLayout from '../../layouts/DashboardLayout';
import { Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OfficeDashboard() {
  return (
    <DashboardLayout role="OFFICE">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back to DistrictFix! 👋</h1>
        <p className="text-blue-100 max-w-2xl text-lg">
          Need IT support? Create a new request and we'll connect you with a verified engineer instantly.
        </p>
        <Link 
          to="/office/requests/create" 
          className="inline-flex items-center gap-2 mt-6 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-bold shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Request
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Pending Requests</div>
            <div className="text-2xl font-bold text-gray-900">2</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-50 p-4 rounded-xl text-green-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-50 p-4 rounded-xl text-orange-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Active Jobs</div>
            <div className="text-2xl font-bold text-gray-900">1</div>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recent Service Requests</h2>
          <Link to="/office/requests" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Request ID</th>
                <th className="px-6 py-4 font-medium">Issue</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Engineer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Dummy Data Row 1 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">REQ-00125</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">CCTV Camera Not Working</div>
                  <div className="text-xs text-gray-500">Balaghat Branch</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Engineer Reached
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Rahul Sharma</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹1,000</td>
              </tr>
              {/* Dummy Data Row 2 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">REQ-00124</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">Network Router Down</div>
                  <div className="text-xs text-gray-500">Main Office</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">Amit Kumar</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
