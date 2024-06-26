import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import AddVehicle from "../components/Modals/AddVehicle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import { myVehicles } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import carAnimation from "../../public/car-animation.json"; 

function MyVehicles() {
  const user = useSelector((state) => state.auth.userDetails);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    
    const userId = user._id;
    await myVehicles(userId).then((res) => {
      if (res.status === 200) {
        setVehicles(res.data.vehicle);
        console.log(res.data);
      }
    });
  };

  
  useEffect(() => {
    fetchVehicles();
  }, []);
  const openAddVehicleModal = () => setIsAddVehicleModalOpen(true);
  const closeAddVehicleModal = () => {
    fetchVehicles()
    setIsAddVehicleModalOpen(false);
  }
  
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <NavBar />
        <div className="flex">
          <div className="sticky top-0 h-screen">
            <SideBar />
          </div>
          <div className="flex-grow p-8 mt-14">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-black mb-4">My Vehicles</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full shadow-lg flex items-center"
                onClick={openAddVehicleModal}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Vehicle
              </motion.button>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <div key={vehicle.id}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-sm"
                    >
                      <div className="relative h-48">
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 rounded-bl-lg">
                          A/C
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-black mb-2">
                          {vehicle.name}
                        </h3>
                        <div className="flex items-center mb-4">
                          <FontAwesomeIcon
                            icon={faUsers}
                            className="text-indigo-500 mr-2"
                          />
                          <p className="text-gray-700">{vehicle.capacity} seats</p>
                        </div>
                        <p className="text-black -mt-2 mb-2">Status: <span className={`${vehicle.blocked?"text-red-500":"text-green-500"}`}>{vehicle.blocked?"Vehicle details under review" : "Ready for ride"}</span></p>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="col-span-full text-center text-white"
                >
                  <Lottie
                    animationData={carAnimation}
                    style={{ width: 250, margin: "0 auto" }}
                  />
                  <p className="text-xl mt-4 text-black">No vehicles yet. Add your first one!</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {isAddVehicleModalOpen && (
          <AddVehicle isOpen={isAddVehicleModalOpen} onClose={closeAddVehicleModal} />
        )}
      </div>
    
  );
}

export default MyVehicles;