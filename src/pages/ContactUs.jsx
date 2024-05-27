import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "../components/NavBar";
import {
  faBuilding,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMess,setSuccessMess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://sheet.best/api/sheets/1c8e6529-d5dc-465b-a1e9-1307a87b1d79",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Successfully submitted");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setLoading(false);
        setSuccessMess(true); 
      setTimeout(() => {
        setSuccessMess(false); 
      }, 3000);
      } else {
        console.error("Failed to submit form");
        alert("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="relative h-[80vh]">
        <img
          className="w-full h-[80vh] object-cover"
          src="./images/contact.png"
          alt="Scenic View"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h2 className="text-white text-6xl tracking-wide font-bold text-center mt-14">
            Contact Us
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between ml-5 mt-10">
        <div className="md:w-[50%] ml-auto mr-auto max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#0F4056]">
            Let's Plan Your Next Adventure!
          </h2>
          {successMess && 
          <p className="text-green-600 text-center font-medium">Form Submitted Successfully !</p>
          }
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="name"
                className="text-sm font-medium mb-1 text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="phone"
                className="text-sm font-medium mb-1 text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="text-sm font-medium mb-1 text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="message"
                className="text-sm font-medium mb-1 text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Tell us about your dream trip!"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Send Inquiry"}
            </button>
          </form>
        </div>

        <div className="w-[50%]">
          <div className="flex items-center gap-5 mt-7 text-[#0F4056]">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
            <p className="text-lg font-medium">info@woglotechnologies.com</p>
          </div>
          <div className="flex items-center gap-5 mt-7 w-80 text-[#0F4056]">
            <FontAwesomeIcon icon={faPhone} className="text-2xl" />
            <div className="flex flex-col">
              <p className="text-lg font-medium">+91- 944 66 88 095</p>
              <p className="text-lg font-medium">+91- 944 66 88 097</p>
              <p className="text-lg font-medium">+91- 944 66 88 082</p>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-7 text-[#0F4056] w-80 md:max-w-[450px]">
            <FontAwesomeIcon icon={faBuilding} className="text-2xl" />
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium">
                M.K.K Building, Between Matha Theatre & Zeenath Theatre (One Way
                Road), Priyadarshi Road, Periyar Nagar, Near Railway Station,
                Aluva, Kerala 683101
              </p>
              <p className="text-lg font-medium">
                WOGLO Technologies Pvt.LTD 14/291 N, Suite 66G, 1st Floor A
                Square Building Edappally Pukkattupady Road Edathala, P O,
                Kuzhivelippady, Kochi, Kerala 683561
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
