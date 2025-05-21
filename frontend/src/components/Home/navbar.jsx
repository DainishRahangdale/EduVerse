// src/components/Navbar.jsx

const Navbar = () => {
    return (
      <nav className="sticky top-0 z-50 shadow-amber-600 bg-gray-50 text-indigo-900 p-1 pl-4 md:p-4 border-b-1 ">
        <div className="flex  md:flex-row md:items-center md:justify-between max-w-full mx-auto">
          {/* Logo */}
          <div className="text-lg md:text-2xl font-bold tracking-wide  md:mb-0">
            EduVerse
          </div>
  
          {/* Nav Links */}
          <div className="m-1.5 flex md:flex-row gap-2 md:gap-8 text-sm font-medium">
            <a href="/" className="hover:text-indigo-600 hover:underline">Home</a>
            <a href="/courses" className="hover:text-indigo-600 hover:underline">Courses</a>
            <a href="/about" className="hover:text-indigo-600 hover:underline">About Us</a>
            <a href="/contact" className="hover:text-indigo-600 hover:underline">Contact</a>
            <a href="/login" className="hover:text-indigo-600 hover:underline">Login</a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  