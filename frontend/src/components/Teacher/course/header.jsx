import React from 'react';
import {
  ListPlus,
  BookCheck,
  SquarePen,
  Users,
  CalendarDays,
  DollarSign,
  Clock,
} from 'lucide-react';

const Header = ({
  title,
  desc,
  duration,
  price,
  students,
  publishedDate,
  image = '/eduverse_01.png',
}) => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img src={image} alt="eduverse" className="h-72 w-full object-cover opacity-85" />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" /> */}

      {/* Content Card */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-4xl transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-white p-6 rounded-lg shadow-xl mx-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-indigo-800 text-center mb-2">{title}</h1>

          {/* Description and Buttons */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-gray-700 text-sm max-w-xl">{desc}</p>

            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md">
                <ListPlus size={16} /> Chapter
              </button>
              <button className="flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md">
                <BookCheck size={16} /> Publish
              </button>
              <button className="flex items-center gap-2 text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md">
                <SquarePen size={16} /> Edit
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm text-green-700 mt-5">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} /> {publishedDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {duration}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} /> {price}
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} /> {students} students
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
