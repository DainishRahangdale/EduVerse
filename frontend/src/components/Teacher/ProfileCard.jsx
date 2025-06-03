import React from 'react';
import { CalendarDays, Briefcase,Phone, Mail } from 'lucide-react';
import { Pencil } from 'lucide-react';

const ProfileCard = ({ teacher,profileEdit}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg overflow-hidden rounded-2xl flex flex-col    space-y-4">
      <div className='bg-gradient-to-r from bg-purple-500 via-indigo-600 to-blue-500 w-full  h-20'>
      <img
        src={teacher.image_url || '/teacher_profile.png'}
        alt="Teacher"
        className="w-32 h-32 mt-7 ml-4 rounded-full ring-4 ring-white shadow-white border-2 border-purple-600 bg-white"
      />
      </div>
      <button className="ml-auto mr-6 lg:mr-1 lg:mt-10 bg-blue-100  text-blue-800 px-2 py-1 rounded-full hover:scale-105 transition-transform" onClick={()=>{profileEdit(true)}}>
       <Pencil/>
      </button>

      <div className='pb-1 pl-7 mt-4'>
        <p className='text-2xl text-blue-800'>{teacher.name}</p>
        <p className='ml-3 text-sm'>{teacher.description}</p>
      </div>
      <div className="w-full  mx-auto grid md:grid-cols-4 lg:grid-cols-1 gap-6 bg-white p-3 rounded-xl shadow-md border border-gray-200">
  {/* Date of Birth */}
  <div className="flex items-start gap-3">
    <div className="p-2 bg-purple-100 rounded-full">
      <CalendarDays className="w-5 h-5 text-purple-600" />
    </div>
    <div>
      <p className="text-base font-semibold text-gray-800">Date of Birth</p>
      <p className="text-gray-600">{teacher.dob}</p>
    </div>
  </div>

  {/* Years of Experience */}
  <div className="flex items-start gap-3">
    <div className="p-2 bg-indigo-100 rounded-full">
      <Briefcase className="w-5 h-5 text-indigo-600" />
    </div>
    <div>
      <p className="text-base font-semibold text-gray-800">Years of Experience</p>
      <p className="text-green-800">{teacher.yoe} years</p>
    </div>
  </div>

  {/* Phone */}
  <div className="flex items-start gap-3">
    <div className="p-2 bg-green-100 rounded-full">
      <Phone className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <p className="text-base font-semibold text-gray-800">Phone</p>
      <p className="text-gray-600">{teacher.phone}</p>
    </div>
  </div>

  {/* Email */}
  <div className="flex items-start gap-3">
    <div className="p-1 bg-rose-100 rounded-full">
      <Mail className="w-5 h-5 text-rose-600" />
    </div>
    <div className='overflow-clip'>
      <p className="text-base font-semibold text-gray-800">Email</p>
      <p className="text-blue-600 ml-0 lg:ml-0 overflow">{teacher.email}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProfileCard;
