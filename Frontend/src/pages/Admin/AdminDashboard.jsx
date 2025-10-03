import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics, exportBookings } from '../../store/slices/adminSlice';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Users, Calendar, DollarSign, TrendingUp, Download, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { analytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const handleExport = async (format) => {
    try {
      await dispatch(exportBookings(format));
    } catch (error) {
      alert('Export failed. Please try again.');
    }
  };

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', bookings: 45, revenue: 13500 },
    { month: 'Feb', bookings: 52, revenue: 15600 },
    { month: 'Mar', bookings: 38, revenue: 11400 },
    { month: 'Apr', bookings: 61, revenue: 18300 },
    { month: 'May', bookings: 48, revenue: 14400 },
    { month: 'Jun', bookings: 55, revenue: 16500 },
  ];

  const categoryData = [
    { name: 'Technology', value: 35, color: '#3B82F6' },
    { name: 'Music', value: 25, color: '#8B5CF6' },
    { name: 'Business', value: 20, color: '#10B981' },
    { name: 'Arts', value: 20, color: '#F59E0B' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of your event management system</p>
          </div>

          <Link
            to="/admin/events/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Events</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Revenue per Event</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${Math.round(analytics.totalRevenue / Math.max(analytics.totalEvents, 1)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Bookings Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Bookings & Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="#3B82F6" name="Bookings" />
                <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Events & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Events */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Events</h3>
            <div className="space-y-4">
              {analytics.popularEvents.map((event, index) => (
                <div key={event.eventId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(event.bookings / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <Link
                to="/admin/events"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Manage Events
              </Link>

              <button
                onClick={() => handleExport('csv')}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>

              <button
                onClick={() => handleExport('pdf')}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                Export PDF
              </button>

              <Link
                to="/admin/reports"
                className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
