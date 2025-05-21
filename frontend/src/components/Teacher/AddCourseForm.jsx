import React, { useState } from 'react';

const AddCourseForm = ({ onAdd,toggle, techerId }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [stream, setStream] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!thumbnail) return null;

    const formData = new FormData();
    formData.append('file', thumbnail);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace
    formData.append('cloud_name', 'YOUR_CLOUD_NAME'); // Replace

    setUploading(true);
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      setUploading(false);
      console.error('Image upload failed', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Course title is required');
      return;
    }

    const thumbnailUrl = await handleImageUpload();

    const courseData = {
      title,
      desc,
      price,
      stream,
      duration,
      thumbnail: thumbnailUrl || '',
    };

    onAdd(courseData);
   
    // Reset form
    setTitle('');
    setDesc('');
    setPrice('');
    setStream('');
    setDuration('');
    setThumbnail(null);
    toggle(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6  p-6  max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">📚 Add New Course</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title <span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded-md"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
        />
      </div>
<div className='flex justify-between'>
<button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition transform"
        disabled={uploading}

      >
        {uploading ? 'Uploading...' : 'Add Course'}
      </button>

      <button type='cancel'  className="bg-gradient-to-r from-orange-300 to-red-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition transform" onClick={()=>toggle(false)}>
          Cancel
      </button>
</div>
      
    </form>
  );
};

export default AddCourseForm;
