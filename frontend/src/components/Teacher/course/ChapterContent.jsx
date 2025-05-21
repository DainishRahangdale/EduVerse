import { FileText, Plus } from 'lucide-react';
import AddTopicDialog from './AddTopicDialog';
import TopicItem from './TopicItem';
import EmptyTopicsList from './EmptyTopicList';
import { Clock, CalendarDays, CircleDollarSign } from "lucide-react";

const ChapterContent = ({ chapter }) => {
  return (
    <div className="mt-6 border-t pt-5">
      {/* Topics Section */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <span className="mr-2">Topics</span>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            {chapter.topics.length}
          </span>
        </h4>
        <AddTopicDialog />
      </div>

      {chapter.topics.length > 0 ? (
        <ul className="space-y-3">
          {chapter.topics.map((topic) => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </ul>
      ) : (
        <EmptyTopicsList /> 
      )}

      {/* Chapter Tests Section */}
      <div className=" mt-6 border-t pt-5">
        <div className='flex justify-between mr-3'>
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">Chapter Tests</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {chapter.test.length}
          </span>
        </h4>
        <button
            className="flex items-center text-sm h-9 px-3 border border-green-200 text-green-900 rounded hover:bg-green-50 hover:text-green-800 transition-colors"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Test
        </button>
        </div>
        {chapter.test && chapter.test.map((test) => (
  <div
    key={test.id}
    id={test.id}
    className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"
  >
    {/* Title */}
    <div className="flex items-center gap-3 mb-2">
       <FileText className="h-4 w-4 text-green-600" />
      <p className="text-lg font-semibold text-gray-800">{test.title}</p>
    </div>

    {/* Metadata */}
    <div className="flex items-center gap-6 text-sm text-gray-600 mt-2">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-gray-500" />
        <span>{test.created_at}</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span>{test.duration}</span>
      </div>

      <div className="flex items-center gap-2">
        <CircleDollarSign className="w-4 h-4 text-gray-500" />
        <span>{test.marks} marks</span>
      </div>
    </div>
  </div>
))}
       
      </div>
    </div>
  );
};

export default ChapterContent;
