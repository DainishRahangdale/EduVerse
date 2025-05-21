import React, { useState } from 'react';
import coursesData from './course';


const CoursePage = () => {
  const [filters, setFilters] = useState({
    price: { min: 0, max: 500 },
    duration: { min: 0, max: 12 },
    stream: '',
  });

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    // Check if name contains a nested structure like "price-min"
    if (name.includes('-')) {
      const [category, type] = name.split('-'); // e.g., 'price', 'min'
      setFilters((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [type]: value,
        },
      }));
    } else {
      // For simple fields like stream
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const filteredCourses = coursesData.filter((course) => {
    const { min: priceMin, max: priceMax } = filters.price;
    const { min: durationMin, max: durationMax } = filters.duration;
    const streamFilter = filters.stream ? course.stream === filters.stream : true;
    return (
      course.price >= priceMin &&
      course.price <= priceMax &&
      course.duration >= durationMin &&
      course.duration <= durationMax &&
      streamFilter
    );
  });

  return (
    <div className="mx-auto p-6 bg-blue-100 w-full">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-500">Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
  {/* Price Filter */}
 
    <div className="bg-gray-50 p-1 rounded-lg shadow-sm">
      <label className="block font-medium text-gray-700 mb-2">💰 Price Range</label>
      <div className="flex space-x-4">
        <input
          type="number"
          name="price-min"
          placeholder="Min"
          value={filters.price.min}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full text-sm"
        />
        <input
          type="number"
          name="price-max"
          placeholder="Max"
          value={filters.price.max}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full text-sm"
        />
      </div>
    </div>

    {/* Duration Filter */}
    <div className="bg-gray-50 p-1 rounded-lg shadow-sm">
      <label className="block font-medium text-gray-700 mb-2">⏱️ Duration (Months)</label>
      <div className="flex space-x-4">
        <input
          type="number"
          name="duration-min"
          placeholder="Min"
          value={filters.duration.min}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full text-sm"
        />
        <input
          type="number"
          name="duration-max"
          placeholder="Max"
          value={filters.duration.max}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full text-sm"
        />
      </div>
    </div>

    {/* Stream Filter */}
    <div className="bg-gray-50 p-1 rounded-lg shadow-sm">
      <label className="block font-medium text-gray-700 mb-2">📚 Stream</label>
      <select
        name="stream"
        value={filters.stream}
        onChange={handleFilterChange}
        className="p-2 border rounded-md w-full text-sm"
      >
        <option value="">All</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Arts">Arts</option>
      </select>
    </div>
  </div>




      {/* Courses List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredCourses.map((course) => (
    <div
      key={course.id}
      className="rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 bg-white relative hover:border-2 hover:border-amber-600"
    >
     

      
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 text-center">{course.title}</h3>
        <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-24 object-fill"
      />
        <p className="text-sm text-gray-600 line-clamp-3">{course.desc}</p>

        {/* Price Section */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-gray-400 line-through">
            ${course.price}
          </span>
          <span className="text-lg font-bold text-green-600">
            ${course.discountedPrice}
          </span>
           {/* Offer Tag */}
      {course.offer && (
        <span className=" bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
          🔥 {course.offer}% OFF
        </span>
      )}
        </div>

        <div className="text-sm text-gray-500">
          👨‍🏫 <strong>{course.teacher}</strong> • 📚 {course.stream} ⏱ {course.duration} months
        </div>
        
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default CoursePage;
