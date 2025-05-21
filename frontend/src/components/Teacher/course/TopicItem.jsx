import { FileText, Trash2, Edit, Video } from "lucide-react";
import VideoViewer from "./VideoViewer";
import PdfViewer from './PdfViewer';
const TopicItem = ({ topic }) => {
  return (
    <li className="bg-gray-50 p-4 rounded-lg hover:bg-white transition-colors group border border-transparent hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-center">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 shadow-inner ${
            topic.type === "video"
              ? "bg-gradient-to-r from-indigo-100 to-blue-100"
              : "bg-gradient-to-r from-blue-100 to-cyan-100"
          }`}
        >
          {topic.type === "video" ? (  <div>
            <Video className="h-4 w-4 text-indigo-600" />
           
            </div>
          ) : (
            <FileText className="h-4 w-4 text-blue-600" />
          )}
        </div>

        <div>
          <span className="font-medium text-gray-800">{topic.title}</span>
          {topic.type === "video" && topic.duration && (
            <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              ({topic.duration})
            </span>
          )}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
          aria-label="Edit topic"
        >
          <Edit className="h-4 w-4 text-indigo-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Delete topic"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>

      </div>
      </div>
       <div className="mt-5">
       {//resource
        topic.type==='video' ? <VideoViewer   videoUrl={topic.resource} thumbnailUrl={topic.thumbnail}/>:<PdfViewer url={topic.resource}/>
       }
       {/* <VideoViewer
  videoUrl="https://res.cloudinary.com/dfm40rrao/video/upload/v1710932610/samples/sea-turtle.mp4"
  thumbnailUrl="https://res.cloudinary.com/dfm40rrao/image/upload/c_thumb,w_200,g_face/v1718796889/samples/landscapes/beach-boat.jpg"
/> */}

       </div>
     
      
      
    </li>
  );
};

export default TopicItem;
