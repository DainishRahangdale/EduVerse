import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ChapterContent from './ChapterContent';

const ChapterItem = ({ chapter, isExpanded, onToggle }) => {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-l-4 hover:border-l-indigo-500">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div
              onClick={() => onToggle(chapter.id)}
              className="flex items-center cursor-pointer group"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {chapter.title}
              </h3>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 ml-2 text-indigo-500" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-2 text-indigo-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
          </div>

          <div className="flex items-center space-x-3 mt-2 md:mt-0">
            <div className="text-sm font-medium px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full">
              {chapter.topics?.length} Topics
            </div>
            <div className="text-sm font-medium px-3 py-1.5 bg-green-100 text-green-700 rounded-full">
              {chapter.test?.length} Tests
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 animate-slide-down">
            <ChapterContent chapter={chapter} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterItem;
