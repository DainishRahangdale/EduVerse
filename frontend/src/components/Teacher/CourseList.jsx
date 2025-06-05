import React from 'react';
import {useNavigate} from 'react-router-dom';
import { BookOpen, Clock, DollarSign, Users,GraduationCap , CalendarCheck,CalendarDays } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,  LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
    Legend, } from 'recharts';
  


const CourseList = ({ teacherId }) => {
    const navigate = useNavigate();
  const courses = [
    {
      title: "Mastering JavaScript",
      id: 'c1',
      image_url: "ulr",
      duration: '3 Months',
      price: '4999',
      offer: '3999',
      stream: 'Programming',
      created_on: '2024-09-01',
      desc: 'Learn JavaScript from scratch with projects and real-world applications.',
      num_of_students_enrolled: 120,
    },
    {
      title: "React for Beginners",
      id: 'c2',
      image_url: "https://source.unsplash.com/400x250/?reactjs,frontend",
      duration: '2 Months',
      price: '5999',
      offer: '4599',
      stream: 'Frontend',
      created_on: '2024-10-01',
      desc: 'Build interactive UIs using React, hooks, and state management.',
      num_of_students_enrolled: 95,
    },
    {
      title: "Python for Data Science",
      id: 'c3',
      image_url: "/ai_ml_course.jpeg",
      duration: '4 Months',
      price: '6999',
      offer: '5499',
      stream: 'Data Science',
      created_on: '2024-08-01',
      desc: 'Master Python, pandas, and NumPy for analysis and ML basics.',
      num_of_students_enrolled: 150,
    },
    {
      title: "UI/UX Fundamentals",
      id: 'c4',
      image_url: "https://source.unsplash.com/400x250/?design,ux",
      duration: '1.5 Months',
      price: '3999',
      offer: '2999',
      stream: 'Design',
      created_on: '2024-07-15',
      desc: 'Understand UX principles, wireframing, and Figma prototyping.',
      num_of_students_enrolled: 78,
    },
  ];

  return (
    <div className="mt-3 px-2">
      <CourseStats courses={courses}/>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <img src={course.image_url} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-purple-700">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.desc}</p>
              <hr className='text-blue-900'/>
              <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
                <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
                <span className="flex items-center gap-1"><Users size={16} /> {course.num_of_students_enrolled} Enrolled</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-1"><BookOpen size={16} /> {course.stream}</span>
                <span className="flex items-center gap-1 text-green-600"><DollarSign size={16} /> ₹{course.offer}</span>
              </div>
              <div className='flex justify-between mt-2'>
              <p className="text-xs text-gray-400">Created on: {course.created_on}</p>
              <button className='border-1 p-1 text-sm bg-blue-500 text-white rounded-sm  hover:cursor-pointer' onClick={()=>{navigate('/teacher/courseDetails')}}>View Course</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

const COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#facc15', '#34d399'];

const CourseStats = ({ courses }) => {
    const now = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return {
        label: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
      };
    });
  
    // Histogram Data - Courses Added Per Month
    const coursesPerMonth = last12Months.map(({ label, month, year }) => {
      const count = courses.filter((c) => {
        const created = new Date(c.created_on);
        return created.getMonth() === month && created.getFullYear() === year;
      }).length;
      return { month: label, count };
    });
  
    // Line Graph Data - Students Enrolled Per Month
    const studentsPerMonth = last12Months.map(({ label, month, year }) => {
      const totalStudents = courses
        .filter((c) => {
          const created = new Date(c.created_on);
          return created.getMonth() === month && created.getFullYear() === year;
        })
        .reduce((sum, c) => sum + (c.num_of_students_enrolled || 0), 0);
      return { month: label, students: totalStudents };
    });
  
    // Pie Chart Data - Stream Distribution
    const streamCount = {};
    courses.forEach((c) => {
      if (c.stream) {
        streamCount[c.stream] = (streamCount[c.stream] || 0) + 1;
      }
    });
    const streamData = Object.entries(streamCount).map(([stream, value]) => ({
      name: stream,
      value,
    }));
  
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, c) => sum + (c.num_of_students_enrolled || 0), 0);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentMonthCourses = courses.filter((c) => {
      const created = new Date(c.created_on);
      return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
    }).length;
  
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-purple-100 p-4 rounded-lg shadow text-center">
            <GraduationCap className="mx-auto text-purple-600" />
            <h4 className="text-xl font-bold text-purple-800">{totalCourses}</h4>
            <p className="text-sm">Total Courses</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-lg shadow text-center">
            <Users className="mx-auto text-pink-600" />
            <h4 className="text-xl font-bold text-pink-800">{totalStudents}</h4>
            <p className="text-sm">Total Students</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow text-center">
            <BookOpen className="mx-auto text-blue-600" />
            <h4 className="text-xl font-bold text-blue-800">{currentMonthCourses}</h4>
            <p className="text-sm">Courses This Month</p>
          </div>
        </div>
  
        {/* Line Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Student Enrollment</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={studentsPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Bar Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Courses Added Monthly</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coursesPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Pie Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Course Streams Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={streamData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {streamData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  