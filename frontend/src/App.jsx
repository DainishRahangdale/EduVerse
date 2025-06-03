import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/user/Home';
import Course from './pages/user/Course';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import Login from './pages/user/login';
import Signup from './pages/user/signup';
import TeacherDashboard from './pages/teacher/teacherDashboard';
import CourseDetails from "./pages/teacher/courseDetails";
import { AuthProvider } from "./utils/authProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import StudentDashboard from "./pages/student/studentDashboard";
import CourseDetail from "./pages/CourseDetails";
import PaymentPage from "./pages/payment";

function App() {
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/courses' element={<Course/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/coursedetails' element={<CourseDetail/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path='/teacher/dashboard' element={
          <ProtectedRoute>
          <TeacherDashboard/>
          </ProtectedRoute>}/>

        <Route path="/student/dashboard" element={
          <ProtectedRoute>
            <StudentDashboard/>
          </ProtectedRoute>
        }></Route>  
        <Route path='/teacher/courseDetails' element={<CourseDetails/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
