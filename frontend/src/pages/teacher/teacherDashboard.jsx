import React, { useEffect, useState } from 'react';
import AddCourseForm from '../../components/Teacher/AddCourseForm';
import Header from '../../components/Teacher/Header';
import EducationTimeline from '../../components/Teacher/EducationTimeLine';
import ProfileCard from '../../components/Teacher/ProfileCard';
import CourseList from '../../components/Teacher/CourseList';
import { Plus } from 'lucide-react';
import EditProfile from '../../components/Teacher/EditProfile';
import api from '../../utils/api';
import { ToastContainer,toast } from 'react-toastify';


const teacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [courselist, setCourseList] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [teacher, setTeacher] =useState({});
 
  const handleEdit = () => {
    setEditToggle(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await api.get('teacher/dashboard/profile');
        const teacherData = result.data.teacher;
  
        // Convert dob to yyyy-mm-dd
        if (teacherData.dob) {
          const dob = new Date(teacherData.dob);
          const day = String(dob.getDate()).padStart(2, '0');
          const month = String(dob.getMonth() + 1).padStart(2, '0');
          const year = dob.getFullYear();
          teacherData.dob = `${year}-${month}-${day}`;
        } else {
          teacherData.dob = '';
        }
  
        // Convert education to array
        try {
          teacherData.education = teacherData.education
            ? JSON.parse(teacherData.education)
            : [];
        } catch {
          teacherData.education = [];
        }
  
        // Ensure all fields have safe values
        teacherData.name = teacherData.name || '';
        teacherData.phone = teacherData.phone || '';
        teacherData.yoe = teacherData.yoe || '';
        teacherData.description = teacherData.description || '';
        teacherData.image_url = teacherData.image_url || '';
        teacherData.public_id = teacherData.public_id || '';
  
        setTeacher(teacherData);
      } catch (error) {
        toast.error('Unable to get Profile');
      }
    };
  
    fetchProfile();
  }, []);
  
  
  return (
    <div className="min-h-screen  bg-gray-100 px-0 py-0.5 font-sans">
    
      <Header name={teacher.name||teacher.email} />
      <div className='lg:flex h-full'>
      <div className="w-full lg:w-2/8 mx-auto lg:mx-1 px-4 lg:px-0 py-8 lg:py-1 space-y-10">
        <ProfileCard teacher={teacher} profileEdit= {setEditToggle} />
        <EducationTimeline education={teacher.education} />
      </div>
      <div className=" w-full lg:w-6/8  space-y-10">
      {
           editToggle &&<EditProfile teacher={teacher} profileEdit={setEditToggle}/>
      }    
{courselist&&<section className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-6 m-2">
  <AddCourseForm toggle={setCourseList} />
</section>}


<section className=" rounded-3xl pt-5 p-2 pl-0">
     <div className='flex justify-between'>
     <h1 className="text-2xl font-bold text-indigo-500 mb-1 animate-pulse">Welcome back, {teacher.name} 👋</h1>
      <button className='flex gap-0 font-serif bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:scale-105  p-1 rounded-md' onClick={()=>setCourseList(true)}>
        <span>< Plus/></span>New Course
        </button>
     </div>
     <CourseList/>
</section>
</div>

      </div>
      
    <ToastContainer/>
   
  </div>
  )
}

export default teacherDashboard
