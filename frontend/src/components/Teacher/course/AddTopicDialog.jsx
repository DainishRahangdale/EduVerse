import { useState } from "react";
import { FileText, Plus, Video } from "lucide-react";

const AddTopicDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 px-3 py-1.5 rounded text-sm"
      >
        <Plus className="h-4 w-4" />
        Add Topic
      </button>

      {/* Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Dialog Header */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add New Topic</h2>
              <p className="text-sm text-gray-500">Add a new topic to this chapter.</p>
            </div>

            {/* Dialog Body */}
            <div className="space-y-4">
              {/* Title Input */}
              <div className="space-y-1">
                <label htmlFor="topic-title" className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="topic-title"
                  placeholder="Enter topic title"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Type Selection */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-700 transition-colors">
                    <input
                      type="radio"
                      name="topic-type"
                      className="text-indigo-600"
                    />
                    <Video className="h-4 w-4 text-indigo-600" />
                    <span>Video</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-700 transition-colors">
                    <input
                      type="radio"
                      name="topic-type"
                      className="text-indigo-600"
                    />
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span>PDF</span>
                  </label>
                </div>
              </div>

              {/* Resource URL */}
              <div className="space-y-1">
                <label htmlFor="resource-url" className="text-sm font-medium text-gray-700">
                  Resource URL
                </label>
                <input
                  type="text"
                  id="resource-url"
                  placeholder="Enter resource URL"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                  Duration (for videos)
                </label>
                <input
                  type="text"
                  id="duration"
                  placeholder="e.g. 15 minutes"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save Topic
              </button>
            </div>

            {/* Close (optional X button) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTopicDialog;
