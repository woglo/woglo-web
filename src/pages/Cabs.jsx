import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUser } from "react-icons/fa";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function Cabs() {
  const navigate = useNavigate();
  const cabOptions = [
    {
      name: "Toyota Etios",
      image: "https://imgd.aeplcdn.com/1056x594/n/c6es93a_1572125.jpg",
      capacity: "4+1",
      type: "Sedan",
    },
    {
      name: "Ertiga",
      image: "https://imgd.aeplcdn.com/1056x594/n/c6es93a_1572125.jpg",
      capacity: "6+1",
      type: "SUV",
    },
    {
      name: "Toyota Innova",
      image: "https://www.motorbeam.com/wp-content/uploads/Toyota-Innova1.jpg",
      capacity: "7+1",
      type: "SUV",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://www.chennai-travels.in/wp-content/uploads/2021/12/10-Seater-Tempo-Traveller-Rental-Chennai.jpg",
      capacity: "10",
      type: "Traveler",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://www.gokulamtravels.com/images/tempo12.png",
      capacity: "12",
      type: "Traveler",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://5.imimg.com/data5/DP/RD/WR/GLADMIN-3061/force-traveller-royale-staff-bus-15-d-optional-ac.jpg",
      capacity: "15",
      type: "Traveler",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/17-seater-ac-tempo-traveller-cab-patra-tours-and-travels.jpg",
      capacity: "17",
      type: "Traveler",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://res.cloudinary.com/dnreeobav/image/fetch/c_scale,q_30,w_350,f_auto/l_text:Arial_20_bold:TrucksBuses.com,x_70,y_100,co_rgb:ffffff/https://www.trucksbuses.com/uploads/Force%20Tempo%20Traveller%204020%20Super%2020%20seater.jpg",
      capacity: "20",
      type: "Traveler",
    },
    {
      name: "Force Tempo Traveler",
      image: "https://heritagecabs.in/assets/uploads/product_images/tempo-traveller_9_seater.png",
      capacity: "26",
      type: "Traveler",
    },
    {
      name: "Mini Bus",
      image: "https://i.pinimg.com/474x/47/29/a0/4729a09d60aff288a5ae1bc74e69be85.jpg",
      capacity: "35",
      type: "Bus",
    },
    {
      name: "Bus",
      image: "https://static.wixstatic.com/media/1d8831_7888e405d2494a6a9325845e9a7b37e2~mv2.jpeg/v1/fill/w_640,h_640,al_l,q_85,usm_0.66_1.00_0.01,enc_auto/1d8831_7888e405d2494a6a9325845e9a7b37e2~mv2.jpeg",
      capacity: "40",
      type: "Bus",
    },
    {
      name: "Single Axle Volvo",
      image: "https://ommsaitoursandtravel.com/wp-content/uploads/2023/10/New-Project-27-1.png",
      capacity: "45",
      type: "Volvo",
    },
    {
      name: "Multi Axle Volvo",
      image: "https://static.wixstatic.com/media/0fb46a_0d71632ebd2c4fcb87f5dc6dd13acb9a~mv2.png/v1/fill/w_540,h_306,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/kisspng-ab-volvo-bus-mercedes-benz-car-s.png",
      capacity: "49",
      type: "Volvo",
    },
    {
      name: "Tourist Bus",
      image: "./images/Screenshot_2019-06-24-21-10-53-45.png",
      capacity: "49",
      type: "Bus",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="relative h-[80vh]">
        <img
          className="w-full h-[80vh] object-cover"
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Scenic View"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h2 className="text-white text-4xl md:text-6xl tracking-wide font-bold text-center">
            Choose Your Ride
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cabOptions.map((cab, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-500 transform hover:scale-105"
            >
              <img
                src={cab.image}
                alt={cab.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{cab.name}</h3>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faUsers} className="text-gray-500 mr-2" />
                  <p className="text-gray-600">{cab.capacity}</p>
                </div>
                <p className="text-gray-600 mb-4">{cab.type}</p>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cabs;