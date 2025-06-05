import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, User, Calendar, Clock, Star, Play, CheckCircle, CreditCard, Lock, ArrowLeft  } from "lucide-react";
import api from "../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  if (!course) {
    return <div className="text-center text-red-500 mt-10">Course data not found.</div>;
  }

  const loadRazorpay = async (orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // or use process.env in Vite/React app
      amount: orderData.amount,
      currency: orderData.currency,
      name: "EduVerse",
      description: course.title,
      order_id: orderData.order_id,
      handler: async function (response) {
        
       toast.success("Payment Successfull!!",{ position: 'top-right',
        autoClose: 1000,});

        setTimeout(() => {
            navigate('/student/dashboard');
          }, 1000);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

 
  const orderSummary = {
    subtotal: course.price,
    tax: course.price * 0.08, // 8% tax
    total: course.price * 1.08
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const res = await api.post(
        '/payment/create-order',
        {
          ...formData,
          course_id: course.id,
          amount: orderSummary.total,
          currency: 'INR',
        },
        
      );

      loadRazorpay(res.data);
    } catch (error) {
      console.error("Payment init failed", error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full mx-auto p-0 ">
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduVerse
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex border-1 rounded-sm p-1 mb-6 border-purple-300 text-purple-600 hover:bg-purple-50"
        >
          <ArrowLeft className="h-4 w-4 mt-1 mr-2" />
          Back to Course
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
            <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Complete Your Purchase</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Processing...' : `Pay ₹${orderSummary.total}`}
        </button>
      </form>
    </div>
            </div>

        <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24 p-2">
              <div className="bg-orange-50 p-1 rounded-sm mb-2">
              <h1 className="text-2xl font-semibold  text-orange-500">Order Summary</h1>
              </div>
               
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight">{course.title}</h3>
                    <p className="text-xs text-gray-600">by {course.instructor}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p variant="outline" className="text-xs">
                        {course.level}
                      </p>
                      <span className="text-xs text-gray-500">{course.duration}</span>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">What's included:</span>
                  </div>
                  <ul className="mt-2 text-sm text-green-600 space-y-1">
                    <li>• Lifetime access to course</li>
                    <li>• All course materials</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium text-sm">Secure Payment</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
           
          </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
