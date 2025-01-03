import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Card, CardContent, CardHeader, Typography, Tabs, Tab } from '@mui/material';
import { Download, Calendar as CalendarIcon, Bell, Users, BarChart3 } from 'lucide-react';
import { LineChart, PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Button component styled with Tailwind CSS
const CustomButton = ({ children, onClick }) => (
  <Button onClick={onClick} variant="contained" color="primary">
    {children}
  </Button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: '2025-01-05', company: 'Company A', event: 'Communication Due' },
    { date: '2025-01-10', company: 'Company B', event: 'Follow-up Call Due' },
    { date: '2025-01-15', company: 'Company C', event: 'LinkedIn Post Due' },
  ]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    email: '',
  });

  // Sample data for reports
  const communicationData = [
    { month: 'Jan', emails: 65, calls: 45, linkedinPosts: 30 },
    { month: 'Feb', emails: 75, calls: 55, linkedinPosts: 40 },
    { month: 'Mar', emails: 85, calls: 35, linkedinPosts: 50 },
    { month: 'Apr', emails: 95, calls: 65, linkedinPosts: 45 },
  ];

  const methodDistribution = [
    { name: 'Email', value: 400 },
    { name: 'Phone Call', value: 300 },
    { name: 'LinkedIn Post', value: 200 },
    { name: 'Visit', value: 100 },
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getEventsForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return events.filter(event => event.date === formattedDate);
  };

  const exportData = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  const handleAddCompany = () => {
    console.log("Company Added", newCompany);
    setNewCompany({
      name: '',
      location: '',
      linkedin: '',
      email: '',
    });
  };

  // Report Module with charts
  const ReportModule = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Typography variant="h6">Communication Analytics</Typography>
              <div className="space-x-2">
                <CustomButton onClick={() => exportData('csv')}>
                  <Download className="w-4 h-4 mr-2" /> CSV
                </CustomButton>
                <CustomButton onClick={() => exportData('pdf')}>
                  <Download className="w-4 h-4 mr-2" /> PDF
                </CustomButton>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="h-80">
                <Typography variant="body1" className="mb-4">Communication Trends</Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="emails" stroke="#8884d8" />
                    <Line type="monotone" dataKey="calls" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="linkedinPosts" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
  
              <div className="h-80">
                <Typography variant="body1" className="mb-4">Communication Methods Distribution</Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={methodDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      <Cell key="email" fill="#8884d8" />
                      <Cell key="phoneCall" fill="#82ca9d" />
                      <Cell key="linkedinPost" fill="#ffc658" />
                      <Cell key="visit" fill="#ff7300" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  // Admin Module for managing companies and methods
  const AdminModule = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Company Management</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={newCompany.name}
                onChange={(e) => setNewCompany(prevState => ({ ...prevState, name: e.target.value }))}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCompany.location}
                onChange={(e) => setNewCompany(prevState => ({ ...prevState, location: e.target.value }))}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="LinkedIn Profile"
                value={newCompany.linkedin}
                onChange={(e) => setNewCompany(prevState => ({ ...prevState, linkedin: e.target.value }))}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Email"
                value={newCompany.email}
                onChange={(e) => setNewCompany(prevState => ({ ...prevState, email: e.target.value }))}
                className="p-2 border rounded"
              />
            </div>
            <Button className="w-full" onClick={handleAddCompany}>Add Company</Button>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Communication Methods</h3>
          <div className="space-y-2">
            {['LinkedIn Post', 'LinkedIn Message', 'Email', 'Phone Call', 'Other'].map((method) => (
              <div key={method} className="flex items-center justify-between p-2 border rounded">
                <span>{method}</span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // User Module with communication details
  const UserModule = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Communication Dashboard</h3>
          <div className="space-y-4">
            {['Company A', 'Company B', 'Company C'].map((company) => (
              <div
                key={company}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{company}</h3>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">Log Communication</button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Last communication: Email (2 days ago)
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Notifications</h3>
          <div className="space-y-2">
            <div className="p-2 bg-red-50 text-red-700 rounded">
              Overdue: Company A (5 days)
            </div>
            <div className="p-2 bg-yellow-50 text-yellow-700 rounded">
              Due Today: Company B
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Company Communication Calendar</h3>
          <div className="space-y-4">
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="react-calendar h-[400px] w-full border-2 border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              tileClassName={({ date, view }) => {
                const eventsOnDate = getEventsForDate(date);
                if (eventsOnDate.length > 0) {
                  return 'highlighted-event bg-yellow-200 text-yellow-800 hover:bg-yellow-400 transition-all ease-in-out duration-300 transform scale-105';
                }
                return '';
              }}
              tileContent={({ date, view }) => {
                const eventsOnDate = getEventsForDate(date);
                if (eventsOnDate.length > 0) {
                  return (
                    <div className="flex justify-center items-center p-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                      {eventsOnDate.length}
                    </div>
                  );
                }
                return null;
              }}
            />
            <div className="mt-4">
              {getEventsForDate(date).length > 0 ? (
                <div>
                  <h4 className="font-medium text-lg">Events for {date.toDateString()}:</h4>
                  <ul className="list-disc pl-6">
                    {getEventsForDate(date).map((event, index) => (
                      <li key={index} className="text-gray-600">
                        <span className="font-semibold">{event.company}:</span> {event.event}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-600">No events for this day</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Communication Tracker</h1>
            <div className="mb-4">
              <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} centered>
                <Tab label={<><Users className="w-4 h-4 mr-2" /> User</>} value="user" />
                <Tab label={<><CalendarIcon className="w-4 h-4 mr-2" /> Admin</>} value="admin" />
                <Tab label={<><BarChart3 className="w-4 h-4 mr-2" /> Reports</>} value="reports" />
              </Tabs>
            </div>

            {/* Tabs for different modules */}
            {activeTab === 'user' && <UserModule />}
            {activeTab === 'admin' && <AdminModule />}
            {activeTab === 'reports' && <ReportModule />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default App;
