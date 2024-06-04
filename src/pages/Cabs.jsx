import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import BookNow from "../components/Modals/BookNow";
import PersonalDetails from "../components/Modals/PersonalDetails";

function Cabs() {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedCab,setSelectedCab] = useState(null);
  const cabOptions = [
    {
      name: "Toyota Etios or similar",
      image: "https://www.pngitem.com/pimgs/m/133-1332903_white-etios-car-price-hd-png-download.png",
      capacity: "4+1",
      type: "Sedan",
      hourlyRate:300,
      tax:90,
      extraKm:18,
      extraMin:5,
      luggage:1
    },
    {
      name: "Ertiga or similar",
      image: "https://imgd.aeplcdn.com/1056x594/n/c6es93a_1572125.jpg",
      capacity: "6+1",
      type: "MUV",
      hourlyRate:350,
      tax:105,
      extraKm:22,
      extraMin:7,
      luggage:2
    },
    {
      name: "Toyota Innova or similar",
      image: "https://www.motorbeam.com/wp-content/uploads/Toyota-Innova1.jpg",
      capacity: "7+1",
      type: "SUV",
      hourlyRate:375,
      tax:115,
      extraKm:22,
      extraMin:8,
      luggage:3
    },
    {
      name: "Force Tempo Traveller",
      image: "https://www.chennai-travels.in/wp-content/uploads/2021/12/10-Seater-Tempo-Traveller-Rental-Chennai.jpg",
      capacity: "10",
      type: "Traveller",
      hourlyRate:450,
      tax:135,
      extraKm:23,
      extraMin:9
    },
    {
      name: "Force Tempo Traveller",
      image: "https://www.gokulamtravels.com/images/tempo12.png",
      capacity: "12",
      type: "Traveller",
      hourlyRate:475,
      tax:145,
      extraKm:25,
      extraMin:10
    },
    {
      name: "Force Tempo Traveller",
      image: "https://5.imimg.com/data5/DP/RD/WR/GLADMIN-3061/force-traveller-royale-staff-bus-15-d-optional-ac.jpg",
      capacity: "15",
      type: "Traveller",
      hourlyRate:500,
      tax:150,
      extraKm:26,
      extraMin:11
    },
    {
      name: "Force Tempo Traveller",
      image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/17-seater-ac-tempo-traveller-cab-patra-tours-and-travels.jpg",
      capacity: "17",
      type: "Traveller",
      hourlyRate:600,
      tax:180,
      extraKm:28,
      extraMin:12
    },
    {
      name: "Force Tempo Traveller",
      image: "https://res.cloudinary.com/dnreeobav/image/fetch/c_scale,q_30,w_350,f_auto/l_text:Arial_20_bold:TrucksBuses.com,x_70,y_100,co_rgb:ffffff/https://www.trucksbuses.com/uploads/Force%20Tempo%20Traveller%204020%20Super%2020%20seater.jpg",
      capacity: "20",
      type: "Traveller",
      hourlyRate:700,
      tax:210,
      extraKm:30,
      extraMin:14
    },
    {
      name: "Force Tempo Traveller",
      image: "https://heritagecabs.in/assets/uploads/product_images/tempo-traveller_9_seater.png",
      capacity: "26",
      type: "Traveller",
      hourlyRate:900,
      tax:270,
      extraKm:34,
      extraMin:18
    },
    {
      name: "Mini Bus",
      image: "https://i.pinimg.com/474x/47/29/a0/4729a09d60aff288a5ae1bc74e69be85.jpg",
      capacity: "35",
      type: "Bus",
      hourlyRate:1200,
      tax:360,
      extraKm:45,
      extraMin:22
    },
    {
      name: "Bus",
      image: "https://static.wixstatic.com/media/1d8831_7888e405d2494a6a9325845e9a7b37e2~mv2.jpeg/v1/fill/w_640,h_640,al_l,q_85,usm_0.66_1.00_0.01,enc_auto/1d8831_7888e405d2494a6a9325845e9a7b37e2~mv2.jpeg",
      capacity: "40",
      type: "Bus",
      hourlyRate:1400,
      tax:420,
      extraKm:50,
      extraMin:26
    },
    {
      name: "Single Axle Volvo",
      image: "https://ommsaitoursandtravel.com/wp-content/uploads/2023/10/New-Project-27-1.png",
      capacity: "45",
      type: "Volvo",
      hourlyRate:2000,
      tax:600,
      extraKm:75,
      extraMin:37
    },
    {
      name: "Multi Axle Volvo",
      image: "https://static.wixstatic.com/media/0fb46a_0d71632ebd2c4fcb87f5dc6dd13acb9a~mv2.png/v1/fill/w_540,h_306,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/kisspng-ab-volvo-bus-mercedes-benz-car-s.png",
      capacity: "49",
      type: "Volvo",
      hourlyRate:2500,
      tax:750,
      extraKm:85,
      extraMin:46
    },
    {
      name: "Tourist Bus",
      image: "./images/Screenshot_2019-06-24-21-10-53-45.png",
      capacity: "49",
      type: "Bus",
      hourlyRate:1800,
      tax:540,
      extraKm:60,
      extraMin:34
    },
  ];

  const fleetSectionRef = useRef(null);
  const hourlyRentalSectionRef = useRef(null);
  

  const scrollToHourlyRentalSection = ()=>{
    hourlyRentalSectionRef.current.scrollIntoView({behavior:'smooth'});
  }

  const handleModal = (cab)=>{
    setIsModalOpen(!isModalOpen)
    setSelectedCab(cab)
  } 
  
  useEffect(() => {
    const handleScroll = (e) => {
      if (isModalOpen) {
        e.preventDefault();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalOpen]);

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
      <p className="text-white text-lg md:text-xl mt-4">Hourly Rentals Available</p>
      <div className="flex items-center mt-8">
        <button className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded-md transition-colors duration-300 hover:bg-white hover:text-gray-800"
        onClick={scrollToHourlyRentalSection}
        >
          Learn More
        </button>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={fleetSectionRef}>
    <h2 className="text-3xl font-bold mb-6 text-black">Hourly Rentals Cabs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {cabOptions.map((cab, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-500 transform hover:scale-105"
        >
          <img src={cab.image} alt={cab.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-black">{cab.name}</h3>
            <p className="text-xs font-semibold">A/C</p>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faUsers} className="text-gray-500 mr-2" />
              <p className="text-gray-600">{cab.capacity}</p>
            </div>
            <p className="text-gray-600 mb-4">{cab.type}</p>
            <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              onClick={() => handleModal(cab)}
            >
              Book Now
            </button>
            <p className="text-sm text-black">Starts from ₹{cab.hourlyRate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className=" py-12" ref={hourlyRentalSectionRef}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-black">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Reliable Service</h3>
          <p className="text-gray-600">
            Our fleet consists of well-maintained vehicles, ensuring a safe and comfortable journey for you and your
            loved ones.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Experienced Drivers</h3>
          <p className="text-gray-600">
            Our drivers are professionally trained and have extensive knowledge of local routes, ensuring you reach your
            destination on time.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-black">Hourly Rentals</h3>
        <p className="text-gray-600">
          Need a ride for just a few hours? No problem! Our flexible hourly rental options are perfect for running errands, attending appointments, or exploring the city. Stay on the move without committing to a full-day rental.
        </p>
      </div>
      </div>
    </div>
  </div>

  <Footer />

  <div className="z-44">
    {/* {isModalOpen && <BookNow isOpen={handleModal} onClose={handleModal} cab={selectedCab} />} */}
    {isModalOpen && <PersonalDetails isOpen={handleModal} onClose={handleModal} cab={selectedCab} />}

  </div>
</>
  );
}

export default Cabs;