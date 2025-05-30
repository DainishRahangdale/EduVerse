import React from 'react'
import Navbar from '../../components/Home/navbar'
import Hero from '../../components/Home/hero'
import SubjectSlider from '../../components/Home/subject-slider'
import LiveChat from '../../components/Home/live-chat'
import Quize from '../../components/Home/quize'
import TestimonialsSlider from '../../components/Home/testimonials'
import CTASection from '../../components/Home/cta'
import Footer from '../../components/Home/footer'


const Home = () => {
  console.log(import.meta.env.VITE_APP_USER_NAME);
  
  return (
    <div className='bg-blue-100'>
      <Navbar/>
      <Hero/>
      <SubjectSlider/>
      <LiveChat/>
      <Quize/>
      <TestimonialsSlider/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Home
