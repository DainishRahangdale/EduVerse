import React from 'react'
import CourseHeader from '../../components/Student/Course/header'
import CourseHero from '../../components/Student/Course/hero';
import {useState} from 'react';
import ContentViewer from '../../components/Student/Course/ContentViewer';
import ChapterSidebar from '../../components/Student/Course/leftLayout';

const course = {
  title: "Mastering React",
  description: "Comprehensive course on React with hands-on projects and real-world examples.",
  price: "₹4,999",
  registeredDate: "2025-05-12T10:30:00Z",
  watch_time: "32000sec",
  total_time: "6500000sec",
  teacherName: "John Doe",
  completion: 78,
  chapters: [
    {
      title: "Introduction",
      chapter_id: 1,
      description: "Overview of React and the course structure.",
      topics: [
        { topic_id: 1, title: "Intro Video", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { topic_id: 2, title: "Chapter PDF", type: "pdf", url: "https://example.com/sample.pdf" }
      ],
      tests: [
        { test_id: 1, title: "Chapter 1 Quiz", type: "test", url: "/test/ch1", total: 10, obtained: 8 },
        { test_id: 2, title: "Chapter 1 Quiz", type: "test", url: "/test/ch1", total: 10, obtained: 6 }
      ]
    },
    {
      title: "JSX & Components",
      chapter_id: 2,
      description: "Learn about JSX syntax and how to build components.",
      topics: [
        { topic_id: 3, title: "JSX Explained", type: "video", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
        { topic_id: 4, title: "Component Hierarchy", type: "pdf", url: "https://example.com/components.pdf" }
      ],
      tests: [
        { test_id: 2, title: "JSX & Components Test", type: "test", url: "/test/ch2", total: 15, obtained: 12 }
      ]
    },
    {
      title: "State & Props",
      chapter_id: 3,
      description: "Understand state management and prop passing.",
      topics: [
        { topic_id: 5, title: "Props in Depth", type: "video", url: "https://www.youtube.com/watch?v=IYvD9oBCuJI" },
        { topic_id: 6, title: "State Management", type: "pdf", url: "https://example.com/state.pdf" }
      ],
      tests: [
        { test_id: 3, title: "State & Props Quiz", type: "test", url: "/test/ch3", total: 20, obtained: 16 },
        { test_id: 2, title: "JSX & Components Test", type: "test", url: "/test/ch2", total: 15, obtained: 12 },
        { test_id: 2, title: "JSX & Components Test", type: "test", url: "/test/ch2", total: 15, obtained: 12 }
      ]
    },
    {
      title: "Hooks",
      chapter_id: 4,
      description: "Explore React hooks like useState and useEffect.",
      topics: [
        { topic_id: 7, title: "useState & useEffect", type: "video", url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U" },
        { topic_id: 8, title: "Hooks Overview", type: "pdf", url: "https://example.com/hooks.pdf" }
      ],
      tests: [
        { test_id: 4, title: "Hooks Assessment", type: "test", url: "/test/ch4", total: 25, obtained: 21 },
        { test_id: 2, title: "JSX & Components Test", type: "test", url: "/test/ch2", total: 15, obtained: 12 }
      ]
    },
    {
      title: "Project: Todo App",
      chapter_id: 5,
      description: "Build a complete Todo application using everything learned.",
      topics: [
        { topic_id: 9, title: "Project Walkthrough", type: "video", url: "https://www.youtube.com/watch?v=pCA4qpQDZD8" },
        { topic_id: 10, title: "Codebase Overview", type: "pdf", url: "https://example.com/todo-guide.pdf" }
      ],
      tests: [
        { test_id: 5, title: "Project Evaluation", type: "test", url: "/test/ch5", total: 10, obtained: 9 },
        { test_id: 2, title: "JSX & Components Test", type: "test", url: "/test/ch2", total: 15, obtained: 12 }
      ]
    }
  ]
};



const EnrolledCourse = () => {
 const [selectedTopic, setSelectedTopic] = useState(null);
    
  return (
    <div  className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans'>
      <CourseHeader/>
      <CourseHero course= {course}/>

      <div className="relative flex flex-col md:flex-row h-screen">
      <ChapterSidebar
        chapters={course.chapters}
        onSelectTopic={(topic) => setSelectedTopic(topic)}
      />
      <ContentViewer topic={selectedTopic} />
    </div>
      
    </div>
  )
}

export default EnrolledCourse
