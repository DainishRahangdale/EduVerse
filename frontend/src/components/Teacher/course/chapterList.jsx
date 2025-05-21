import React, { useState } from 'react';
import { PlusCircle, BookOpen, FileVideo, FileText, ClipboardList,  Clock, } from 'lucide-react';
import ChapterItem from './ChapterItem';
import EmptyChaptersList from './EmptyChapterList';
const CourseDetail = ({ course }) => {
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
                    {course.chapters.length}
                    </span>
                    </h2>
            <button className="bg-violet-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center gap-1">
              <PlusCircle className="h-4 w-4" /> Add Chapter
            </button>
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
