import { faClock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import PersonalDetails from "./PersonalDetails";

function BookNow({ isOpen, onClose, cab }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupDate,setPickupDate] = useState('')
  const [selectedHours, setSelectedHours] = useState('');
  const [total, setTotal] = useState(0);
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [result,setResult] = useState({});

  const locationData = [
    "Alappuzha",
    "Alangad",
    "Vylathur",
    "Wadakkanchery (Wadakkancherry)",
  ].join(",");
  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    setPickupLocation(inputValue);
    if (inputValue) {
      const suggestions = locationData
        .split(',')
        .filter((location) =>
          location.toLowerCase().startsWith(inputValue.toLowerCase())
        );
      setSuggestedLocations(suggestions);
    } else {
      setSuggestedLocations([]);
    }
    validateForm(inputValue, pickupTime, selectedHours);
  };

  const handleTimeChange = (e) => {
    setPickupTime(e.target.value);
    validateForm(pickupLocation, e.target.value, selectedHours);
  };

  const handleRate = (e) => {
    const hrs = e.target.value;
    const baseRate = cab.hourlyRate;
    setTotal(hrs * baseRate);
    setSelectedHours(hrs);
    validateForm(pickupLocation, pickupTime, hrs);
  };

  const handleBookNow = () => {
    if (isFormValid) {
      const bookingResult = {
        location: pickupLocation,
        date: pickupDate,
        time: pickupTime,
        package: `${selectedHours} Hours`,
        vehicle: cab.name
      };
      setResult(bookingResult);
      setIsPersonalDetailsModalOpen(true);
    }
  };

  const handleLocation = (location) => {
    setPickupLocation(location);
    setSuggestedLocations([]);
    validateForm(location, pickupTime, selectedHours);
  };

  const validateForm = (location, time, hours) => {
    if (location && time && hours) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handlePersonalDetailsModal = () => {
    setIsPersonalDetailsModalOpen(!isPersonalDetailsModalOpen);
  };

  useEffect(() => {
    console.log("Result", result);
  }, [result]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 bg-white rounded-lg shadow-lg p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white rounded-t-lg p-4">
        <h2 className="text-2xl font-bold mb-2">Book Your Journey</h2>
        <p className="text-sm">
          Choose your preferred ride and let's hit the road!
        </p>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <img className="w-44 rounded-lg" src={cab.image} alt="" />
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">{cab.name}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faUsers} />
              <p>{cab.capacity}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm mb-2">Enter your travel details:</p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Pick-up Location"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={pickupLocation}
            />
            {suggestedLocations.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-y-auto bg-white rounded-md shadow-md">
                {suggestedLocations.map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocation(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="date"
              placeholder="Travel Date"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setPickupDate(e.target.value)}
            />
            <div className="flex items-center gap-2 bg-white rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
              <FontAwesomeIcon icon={faClock} className="text-gray-400 mx-2" />
              <input
                type="time"
                value={pickupTime}
                onChange={handleTimeChange}
                placeholder="Pick-up Time"
                className="w-full px-3 py-2 rounded-md bg-transparent focus:outline-none"
              />
            </div>
            <select
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleRate}
              value={selectedHours}
            >
              <option value="" disabled>
                Select Hours
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}hrs {(i + 1) * 10}kms
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 bg-blue-100 font-semibold py-2 px-4 rounded-md transition-colors duration-300 shadow-inner">
              <p className="text-lg font-bold text-blue-800">Total Cost:</p>
              <p className="text-lg font-semibold text-blue-600">₹{total}</p>
            </div>
            <p className="text-xs">{`+₹${cab.tax}(Taxes & Charges)`}</p>
          </div>
          <div>
            <button
              className="bg-white text-red-400 font-semibold py-2 px-4 mr-2 rounded-md transition-colors duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
              onClick={handleBookNow}
              disabled={!isFormValid}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {isPersonalDetailsModalOpen && (
        <PersonalDetails
          isOpen={isPersonalDetailsModalOpen}
          onClose={handlePersonalDetailsModal}
          packageDetails={result}
        />
      )}
    </Modal>
  );
}

export default BookNow;