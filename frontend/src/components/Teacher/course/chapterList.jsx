import React, { useState } from 'react';
import { PlusCircle, BookOpen, FileVideo, FileText, ClipboardList,  Clock, } from 'lucide-react';
import ChapterItem from './ChapterItem';
import EmptyChaptersList from './EmptyChapterList';
import AddChapterDialog from './AddChapterDialog';
// Mock data for our course
const course = {
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


const CourseDetail = ({ course_id }) => {
  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleChapter = (id) => {
    setExpandedChapter((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Chapters 
                <span className='ml-3 text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full '>
                    {course.chapters?.length}
                    </span>
                    </h2>

                    <AddChapterDialog course_id={course_id}/>
            {/* <button className="bg-violet-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center gap-1">
              <PlusCircle className="h-4 w-4" /> Add Chapter
            </button> */}
          </div>

          {course.chapters?course.chapters.map((chapter) => (
           
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              isExpanded={expandedChapter === chapter.id}
              onToggle={toggleChapter}
            />
          
          
          )):<EmptyChaptersList/>}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
