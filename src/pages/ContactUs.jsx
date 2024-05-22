import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../components/NavBar';
import { faBuilding, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="relative h-[80vh]">
        <img className="w-full h-[80vh] object-cover" src="./images/contact.png" alt="Scenic View" />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h2 className="text-white text-6xl tracking-wide font-bold text-center mt-14">Contact Us</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between ml-5 mt-10">
        <div className="md:w-[50%] ml-auto mr-auto max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#0F4056]">Let's Plan Your Next Adventure!</h2>
          <form action="#" method="post">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-sm font-medium mb-1 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="text-sm font-medium mb-1 text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-sm font-medium mb-1 text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="message" className="text-sm font-medium mb-1 text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Tell us about your dream trip!"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
            >
              Send Inquiry
            </button>
          </form>
        </div>

      <div className="w-[50%] ">
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
              M.K.K Building, Between Matha Theatre & Zeenath Theatre (One Way Road), Priyadarshi Road, Periyar Nagar, Near Railway Station, Aluva, Kerala 683101
            </p>
            <p className="text-lg font-medium">
              WOGLO Technologies Pvt.LTD 14/291 N, Suite 66G, 1st Floor A Square Building Edappally Pukkattupady Road Edathala, P O, Kuzhivelippady, Kochi, Kerala 683561
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ContactUs;
