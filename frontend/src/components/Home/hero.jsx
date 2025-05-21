import React from 'react'

const hero = () => {
  return (
      <section className="bg-indigo-50 min-h-screen flex items-center justify-center px-6 md:px-16">
  <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
    
    
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
        Learn. Connect. <span class="text-indigo-600">Grow</span> with EduVerse
      </h1>
      <p className="text-gray-600 text-lg">
        Join interactive courses, live chats, and real-time tests from top educators — all in one place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/courses" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
          Explore Courses
        </a>
        <a href="/login" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 shadow">
          Join as Teacher
        </a>
      </div>
    </div>

  
    <div className="w-full h-48 sm:h-64 md:h-[300px] bg-white border-4 rounded-xl flex items-center justify-center text-indigo-400 text-xl overflow-hidden">
      <img src='/e-learning.jpeg' className='w-full h-full '/>
    </div>

  </div>
</section>

   
  )
}

export default hero
