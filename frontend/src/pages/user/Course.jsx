import React from 'react'
import Navbar from '../../components/Home/navbar'
import CoursePage from '../../components/course/courses'
import Footer from '../../components/Home/footer'
const Course = () => {
  return (
    <div className='w-full'>
      <Navbar/>
      <CoursePage/>
      <Footer/>
    </div>
  )
}

export default Course
