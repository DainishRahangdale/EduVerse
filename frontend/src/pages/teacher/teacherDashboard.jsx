import React, { useState } from 'react';
import AddCourseForm from '../../components/Teacher/AddCourseForm';
import Header from '../../components/Teacher/Header';
import EducationTimeline from '../../components/Teacher/EducationTimeLine';
import ProfileCard from '../../components/Teacher/ProfileCard';
import CourseList from '../../components/Teacher/CourseList';
import { Plus } from 'lucide-react';
const teacher = {
  id:1,
  name: 'Ayesha Singh',
  dob: '1985-06-15',
  yoe: 15,
  image: '/teacher_profile.png',
  desc:"she taught very well for many subjects",
  email:"abcdefghijklmno@gmail.com",
  phone:"+91 1234567891",
  education: [
    {
      degree: 'B.Sc. in Physics',
      year: '2005',
      institute: 'University of Delhi',
    },
    {
      degree: 'M.Sc. in Computer Science',
      year: '2007',
      institute: 'IIT Bombay',
    },
    {
      degree: 'Ph.D. in Artificial Intelligence',
      year: '2012',
      institute: 'Stanford University',
    },
  ],
};
const teacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [courselist, setCourseList] = useState(false);
  const handleEdit = () => {
    alert("Edit profile clicked!");
  };

  const handleAddCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };
  return (
    <div className="min-h-screen  bg-gray-300 px-0 py-0.5 font-sans">
    
      <Header name={teacher.name} />
      <div className='lg:flex h-full'>
      <div className="w-full lg:w-2/8 mx-auto lg:mx-1 px-4 lg:px-0 py-8 lg:py-1 space-y-10">
        <ProfileCard teacher={teacher} />
        <EducationTimeline education={teacher.education} />
      </div>
      <div className=" w-full lg:w-6/8  space-y-10">    
{courselist&&<section className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-6 m-2">
  <AddCourseForm onAdd={handleAddCourse} toggle={setCourseList} teacherId={teacher.id} />
</section>}


<section className=" rounded-3xl pt-5 p-2 pl-0">
     <div className='flex justify-between'>
      <h1 className='text-2xl font-semibold text-indigo-800'>
      📚Your Courses
      </h1>
      <button className='border-2 flex gap-0 font-serif bg-indigo-600 text-white hover:scale-105 border-blue-600 p-1 rounded-md' onClick={()=>setCourseList(true)}>
        <span>< Plus/></span>New Course
        </button>
     </div>
     <CourseList/>
</section>
</div>

      </div>
      
    
   
  </div>
  )
}

export default teacherDashboard
