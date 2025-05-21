import React, { useState } from 'react'
import Header from '../../components/Teacher/course/header';
import ChapterList from '../../components/Teacher/course/chapterList';
import StudentList from '../../components/Teacher/course/StudentList';



// Mock data for our course
const courseData = {
  id: 1,
  title: "Advanced JavaScript Fundamentals",
  image:"",
  // image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  description: "Master advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features. Build real-world applications while learning professional coding patterns and best practices.",
  duration: "8 weeks",
  price: 149.99,
  publishedDate: "10 Jan, 2023",
  students: 342,
  chapters: [
    {
      id: 1,
      title: "Introduction to Advanced JavaScript",
      description: "Overview of the course and introduction to advanced JavaScript concepts",
      topics: [
        {
          id: 1,
          title: "Course Overview",
          type: "video",
          duration: "15 minutes",
          resource: "https://www.youtube.com/watch?v=gOWmKowrIa0"
        },
        {
          id: 2,
          title: "JavaScript Fundamentals Recap",
          type: "pdf",
          resource: "https://example.com/pdf1"
        }
      ],
      test:[{
        title:'test_01',
        id:'1',
        created_at:'23-03-2023',
        duration:'2h',
        marks:'100'
      },
      {
        title:'test_02',
        id:'2',
        created_at:'23-04-2023',
        duration:'2h',
        marks:'100'
      },
    ]
    },
    {
      id: 2,
      title: "Working with Closures and Scopes",
      description: "Deep dive into JavaScript closures, lexical scope and practical applications",
      topics: [
        {
          id: 3,
          title: "Understanding Closures",
          type: "video",
          duration: "25 minutes",
          resource: "https://example.com/video2"
        },
        {
          id: 4,
          title: "Practical Closure Patterns",
          type: "video",
          duration: "30 minutes",
          resource: "https://example.com/video3"
        },
        {
          id: 5,
          title: "Closure Exercises",
          type: "pdf",
          resource: "https://example.com/pdf2"
        }
      ],
      test:[{
        title:'test_01',
        id:'1',
        created_at:'23-03-2023',
        duration:'2h',
        marks:'100'
      },
      {
        title:'test_02',
        id:'2',
        created_at:'23-04-2023',
        duration:'2h',
        marks:'100'
      },
    ]
    }
  ]
};

const courseDetails = () => {

  const [toggle, setToggle]  = useState(true);

  return (
    <div className="w-full h-full bg-blue-50">
    <Header image={courseData.image?courseData.image:'/eduverse_01.png'} title={courseData.title} desc={courseData.description} price={courseData.price} duration={courseData.duration} students={courseData.students} publishedDate={courseData.publishedDate} />

    <div className="bg-white px-0 py-0 rounded-xl overflow-hidden  flex gap-4 max-w-1/2 mx-auto mt-5">
      <button
        onClick={() => setToggle(true)}
        className={`w-full py-1 rounded-lg font-semibold transition-all duration-300 ${
          toggle
            ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white'
            : 'bg-white text-slate-600'
        }`}
      >
        Chapters
      </button>

      <button
        onClick={() => setToggle(false)}
        className={`w-full py-1 rounded-lg font-semibold transition-all duration-300 ${
          !toggle
            ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white'
            : 'bg-white text-slate-600'
        }`}
      >
        Students
      </button>
    </div>
   <div  className='m-4 rounded-lg'>
    {toggle && <ChapterList course={courseData}/>}
    {!toggle && <StudentList/>}
    </div>

  </div>
  )
}

export default courseDetails
