import React from 'react'
import CourseHeader from '../../components/Student/Course/header'
import CourseHero from '../../components/Student/Course/hero'

const course = {
  title: "Mastering React",
  description: "Comprehensive course on React with hands-on projects.",
  price: "₹4,999",
  registeredDate: "2025-05-12T10:30:00Z",
  teacherName: "John Doe",
  completion: 78,
  performance: [
    {
      chapter: "Introduction",
      tests: [
        { obtained: 8, total: 10 },
        { obtained: 6, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
    {
      chapter: "Hooks",
      tests: [
        { obtained: 16, total: 20 },
        { obtained: 18, total: 20 }
      ]
    },
    {
      chapter: "Routing",
      tests: [
        { obtained: 7, total: 10 },
        { obtained: 8, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
     {
      chapter: "Introduction",
      tests: [
        { obtained: 8, total: 10 },
        { obtained: 6, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
    {
      chapter: "Hooks",
      tests: [
        { obtained: 16, total: 20 },
        { obtained: 18, total: 20 }
      ]
    },
    {
      chapter: "Routing",
      tests: [
        { obtained: 7, total: 10 },
        { obtained: 8, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
     {
      chapter: "Introduction",
      tests: [
        { obtained: 8, total: 10 },
        { obtained: 6, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
    {
      chapter: "Hooks",
      tests: [
        { obtained: 16, total: 20 },
        { obtained: 18, total: 20 }
      ]
    },
    {
      chapter: "Routing",
      tests: [
        { obtained: 7, total: 10 },
        { obtained: 8, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
     {
      chapter: "Introduction",
      tests: [
        { obtained: 8, total: 10 },
        { obtained: 6, total: 10 },
        { obtained: 9, total: 10 }
      ]
    },
    {
      chapter: "Hooks",
      tests: [
        { obtained: 16, total: 20 },
        { obtained: 18, total: 20 }
      ]
    },
    {
      chapter: "Routing",
      tests: [
        { obtained: 7, total: 10 },
        { obtained: 8, total: 10 },
        { obtained: 9, total: 10 }
      ]
    }
  ]
};


const EnrolledCourse = () => {

    
  return (
    <div  className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans'>
      <CourseHeader/>
      <CourseHero course= {course}/>
      
    </div>
  )
}

export default EnrolledCourse
