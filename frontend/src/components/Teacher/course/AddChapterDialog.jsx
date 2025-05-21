import { useState } from 'react';
import { Plus } from 'lucide-react';

const AddChapterDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const closeDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);

  const handleSave = () => {
    // Logic to save the chapter
    console.log('Chapter Title:', title);
    console.log('Chapter Description:', description);
    closeDialog();
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Chapter
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-md shadow-lg p-6 relative animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800">Add New Chapter</h2>
            <p className="text-sm text-gray-600 mb-4">Create a new chapter for your course.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="chapter-title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="chapter-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter chapter title"
                />
              </div>

              <div>
                <label htmlFor="chapter-desc" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="chapter-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter chapter description"
                  rows="4"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Save Chapter
              </button>
            </div>

            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddChapterDialog;
