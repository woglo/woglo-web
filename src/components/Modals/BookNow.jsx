import { faClock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import PersonalDetails from "./PersonalDetails";
import { toast } from "sonner";
import TermsAndConditions from "./TermsAndConditions";

function BookNow({ isOpen, onClose, data, cab }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupDate,setPickupDate] = useState('')
  const [datePlaceHolder,setDatePlaceHolder] = useState("Travel Date")
  const [selectedHours, setSelectedHours] = useState('');
  const [total, setTotal] = useState(0);
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [result,setResult] = useState(data);
  const [agreeTermsAndCondition,setAgreeTermsAndCondition] = useState(false)
  const [termsAndCondition,setTermsAndCondition] = useState(false)

  
  useEffect(() => {
    validateForm(pickupLocation, pickupTime, selectedHours, agreeTermsAndCondition);
  }, [pickupLocation, pickupTime, selectedHours, agreeTermsAndCondition]);
  
  const locationData = [
    "Alappuzha",
    "Alangad",
    "Thodupuzha",
    "Ancharakandy (Anjarakkandy)",
    "Ajanur",
    "Adichanalloor",
    "Aimanam",
    "Atholi",
    "Abdu Rahiman Nagar",
    "Alathur",
    "Adoor",
    "Alamcode",
    "Adat",
    "Kalpetta",
    "Parassala Railway Station",
    "Kannur International Airport",
    "Aluva Metro Station",
    "ADOOR KSRTC Bus Station",
    "Arookutty",
    "Aluva",
    "Azhikode North",
    "Bangra Manjeshwar",
    "Adinad",
    "Athirampuzha",
    "Ayancheri",
    "Alamcode",
    "Chittur-Thathamangalam",
    "Kozhenchery (Kozhencherry)",
    "Athiyannur",
    "Akathiyoor",
    "Neyyattinkara Railway Station",
    "Cochin International Airport",
    "Pulinchodu Metro Station",
    "ALAPPUZHA KSRTC Bus Station",
    "Aroor",
    "Amballur",
    "Azhikode South",
    "Bare",
    "Ayanivelikulangara",
    "Changanassery",
    "Azhiyur",
    "Ariyallur",
    "Hemambikanagar",
    "Pathanamthitta",
    "Attingal",
    "Ala",
    "Thiruvananthapuram Central Railway Station",
    "Kozhikode International Airport",
    "Companypady Metro Station",
    "ALUVA KSRTC Bus Station",
    "Bharanikkavu",
    "Angamaly",
    "Chala",
    "Chemnad",
    "Chavara",
    "Chengalam South",
    "Balusseri (Balussery)",
    "Chelambra (Idimuzhikkal)",
    "Koduvayur",
    "Thiruvalla (Tiruvalla)",
    "Azhoor",
    "Alur",
    "Veli(halt) Railway Station",
    "Thiruvananthapuram International Airport",
    "Ambattukavu Metro Station",
    "ANAYARA KSRTC Bus Station",
    "Chengannur",
    "Chelamattom",
    "Cheleri",
    "Chengala",
    "Elampalloor",
    "Chethipuzha",
    "Beypore",
    "Cheriyamundam (Ceriyamundam)",
    "Mannarkad-I",
    "Edakkode",
    "Amballur",
    "Murukkampuzha Railway Station",
    "Kannur Domestic Airport",
    "Muttom Metro Station",
    "ANKAMALI KSRTC Bus Station",
    "Chennithala",
    "Chendamangalam",
    "Chelora",
    "Hosabettu",
    "Kallelibhagom",
    "Erattupetta",
    "Chekkiad",
    "Cherukavu",
    "Marutharode",
    "Iroopara",
    "Anjur",
    "Kadakavur Railway Station",
    "Cochin Domestic Airport",
    "Kalamassery Metro Station",
    "ARYANAD KSRTC Bus Station",
    "Cheppad",
    "Chengamanad",
    "Cherukunnu",
    "Kanhangad",
    "Karunagappally (Karunagappalli)",
    "Ettumanoor",
    "Chelannur",
    "Edappal (Edapal)",
    "Muthuthala",
    "Kalliyoor",
    "Anthicad (Anthikad)",
    "Edavai Railway Station",
    "Kozhikode Domestic Airport",
    "Cochin University Metro Station",
    "ARYANKAVU KSRTC Bus Station",
    "Cherthala",
    "Cheranallur",
    "Cheruthazham",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Chemancheri",
    "Irimbiliyam",
    "Ongallur-I",
    "Kanjiramkulam",
    "Avanur",
    "Paravur Railway Station",
    "Thiruvananthapuram Domestic Airport",
    "Pathadipalam Metro Station",
    "ATTINGAL KSRTC Bus Station",
    "Chingoli",
    "Choornikkara",
    "Chirakkal",
    "Keekan",
    "Kottamkara",
    "Nattakam",
    "Cheruvannur",
    "Kalady",
    "Ongallur-II",
    "Karakulam",
    "Avinissery",
    "Kollam Jn. Railway Station",
    "Edapally Metro Station",
    "CHADAYAMANGALAM KSRTC Bus Station",
    "Ezhupunna",
    "Chowwara",
    "Chockli",
    "Koipady",
    "Kottarakkara",
    "Paippad",
    "Chorode",
    "Kannamangalam",
    "Ottappalam (Ottapalam)",
    "Keezhattingal",
    "Brahmakulam",
    "Sasthankotta Railway Station",
    "Changampuzha Park Metro Station",
    "CHALAKUDY KSRTC Bus Station",
    "Haripad",
    "Edathala",
    "Dharmadom",
    "Kudlu",
    "Kulasekharapuram",
    "Palai",
    "Edacheri",
    "Kattipparuthi (Kattipparutti)",
    "Palakkad",
    "Kizhuvalam-Koonthalloor",
    "Chalakudy",
    "Kayankulam Jn. Railway Station",
    "Palarivattom Metro Station",
    "CHANGANASSERY KSRTC Bus Station",
    "Kandalloor",
    "Elamkunnapuzha",
    "Elayavoor",
    "Kunjathur",
    "Mayyanad",
    "Panachikkad",
    "Eramala",
    "Kizhuparamba",
    "Pattambi",
    "Kudappanakkunnu",
    "Chavakkad",
    "Chengannur Railway Station",
    "J. L. N. Stadium Metro Station",
    "CHATHANNUR KSRTC Bus Station",
    "Kanjikkuzhi",
    "Eloor",
    "Eranholi",
    "Madhur",
    "Meenad",
    "Perumbaikad",
    "Eravattur",
    "Kodur",
    "Pirayiri",
    "Kulathummal",
    "Chelakkara",
    "Chingavanam Railway Station",
    "Kaloor Metro Station",
    "CHENGANOOR KSRTC Bus Station",
    "Kannamangalam",
    "Eramalloor",
    "Eruvatti (Eruvatty)",
    "Mangalpady",
    "Nedumpana",
    "Puthuppally",
    "Feroke",
    "Kondotty",
    "Pudussery Central",
    "Malayinkeezhu",
    "Chendrappini",
    "Ettumanur Railway Station",
    "Town Hall Metro Station",
    "CHERTHALA KSRTC Bus Station",
    "Karthikappally",
    "Kadamakkudy",
    "Ezhome",
    "Maniyat",
    "Oachira",
    "Thrikkodithanam",
    "Iringal",
    "Koottilangadi",
    "Pudussery West",
    "Nedumangad",
    "Cherpu",
    "Vaikom Road Railway Station",
    "M. G. Road Metro Station",
    "CHITOOR KSRTC Bus Station",
    "Kattanam",
    "Kadungalloor",
    "Irikkur",
    "Manjeshwar",
    "Panayam",
    "Vaikom",
    "Kakkodi",
    "Kottakkal",
    "Puthunagaram",
    "Neyyattinkara",
    "Cheruthuruthi",
    "Mulanturutti Railway Station",
    "Maharaja's College Metro Station",
    "EDATHUVA KSRTC Bus Station",
    "Kayamkulam",
    "Kakkanad",
    "Iriveri",
    "Mogral",
    "Panmana",
    "Vijayapuram",
    "Karuvanthuruthy",
    "Kuttippuram",
    "Puthuppariyaram",
    "Pallichal",
    "Chevvoor",
    "Ernakulam Jn. Railway Station",
    "Ernakulam South Metro Station",
    "EENCHAKKAL KSRTC Bus Station",
    "Keerikkad",
    "Kalady",
    "Kadachira North",
    "Thrikkaripur",
    "Paravoor (Paravur)",
    "Keezhariyur",
    "Malappuram",
    "Shoranur",
    "Pallippuram",
    "Chiramanangad (Chermanangad)",
    "Kalamasseri Railway Station",
    "Kadavanthra Metro Station",
    "EERATTUPETTAH KSRTC Bus Station",
    "Kodamthuruth",
    "Kalamassery",
    "Kadannappalli",
    "Pallikkara",
    "Perinad",
    "Koothali",
    "Manjeri",
    "Thirumittacode-II",
    "Parassala",
    "Chittanda",
    "Divine Nagar (halt) Railway Station",
    "Vyttila Metro Station",
    "ERNAKULAM KSRTC Bus Station",
    "Kokkothamangalam",
    "Kanayannur",
    "Kadirur",
    "Perole",
    "Poothakkulam",
    "Kottappally",
    "Marancheri (Maranchery)",
    "Thrithala",
    "Parasuvaikkal",
    "Chittilappilly",
    "Nellayi (halt) Railway Station",
    "Thaikoodam Metro Station",
    "ERUMELY KSRTC Bus Station",
    "Komalapuram",
    "Karumalloor",
    "Kalliasseri",
    "Pilicode",
    "Punalur",
    "Kozhikode [Calicut]",
    "Moonniyur (Thalappara)",
    "Vaniyamkulam- II",
    "Sreekaryam",
    "Choolissery",
    "M.G Road",
    "Pattiom",
    "Kodungallur",
    "Chottanikkara",
    "Road/ Kurikad (halt) Railway Station",
    "NORTH PARAVUR KSRTC Bus Station",
    "South Railway Station",
    "Payyannur (Payyanur)",
    "Kolazhy",
    "Ernakulam Town Railway Station",
    "PALA KSRTC Bus Station",
    "North Railway Station",
    "Peralassery (Peralasseri)",
    "Koratty",
    "Aluva Railway Station",
    "PALAKKAD KSRTC Bus Station",
    "Railway Station Aluva",
    "Peringathur",
    "Kottappuram",
    "Karukutty Railway Station",
    "PALODE KSRTC Bus Station",
    "Railway Station Thrippunithura",
    "Pinarayi",
    "Kozhukkully",
    "Chalakudi Railway Station",
    "PAMBA KSRTC Bus Station",
    "Cochin International Airport",
    "Puzhathi",
    "Kumaranellur",
    "Pudukad Railway Station",
    "PANDALAM KSRTC Bus Station",
    "Cochin Domestic Airport",
    "Taliparamba",
    "Kunnamkulam",
    "Punkunnam Railway Station",
    "PAPPANAMCODE KSRTC Bus Station",
    "Thalassery",
    "Kurichikkara",
    "Mullurkara (halt) Railway Station",
    "PARASSALA KSRTC Bus Station",
    "Thottada",
    "Kurumpilavu",
    "Karakkad Railway Station",
    "PATHANAMTHITTA KSRTC Bus Station",
    "Valapattanam",
    "Kuttoor",
    "Pallippuram Railway Station",
    "PATHANAPURAM KSRTC Bus Station",
    "Varam",
    "Madathumpady",
    "Tirunnavaya Railway Station",
    "PAYYANUR KSRTC Bus Station",
    "Madayikonam",
    "Parappanangadi Railway Station",
    "PERINTHAMANNA KSRTC Bus Station",
    "Manakkody",
    "Ferok Railway Station",
    "PEROORKADA KSRTC Bus Station",
    "Manalur (Manaloor)",
    "Vellayil (halt) Railway Station",
    "PERUMBAVOOR KSRTC Bus Station",
    "Manavalassery",
    "Chemancheri (halt) Railway Station",
    "PIRAVOM KSRTC Bus Station",
    "Marathakkara",
    "Tikkotti Railway Station",
    "PONKUNNAM KSRTC Bus Station",
    "Methala",
    "Vadakara Railway Station",
    "PONNANI KSRTC Bus Station",
    "Minalur",
    "Mahe Railway Station",
    "POOVAR KSRTC Bus Station",
    "Mullassery",
    "Dharmadam Railway Station",
    "PUNALUR KSRTC Bus Station",
    "Mundathikode",
    "Kannur Railway Station",
    "PUTHUKKADU KSRTC Bus Station",
    "Muringur Vadakkummuri",
    "Pappinisseri Railway Station",
    "RANNI KSRTC Bus Station",
    "Nadathara",
    "Ezhimala (halt) Railway Station",
    "SULTHAN KSRTC Bus Station",
    "Nedumpura",
    "Chandera Railway Station",
    "THALASSERY KSRTC Bus Station",
    "Nelluwaya",
    "Kanhangad Railway Station",
    "THAMARASSERY KSRTC Bus Station",
    "Nenmenikkara",
    "Kalanad (halt) Railway Station",
    "THIRUVALLA KSRTC Bus Station",
    "Oorakam",
    "Uppala Railway Station",
    "THIRUVAMBADY KSRTC Bus Station",
    "Orumanayur",
    "Amaravila (halt) Railway Station",
    "THODUPUZHA KSRTC Bus Station",
    "Padiyam",
    "Nemom Railway Station",
    "THOTTILPALAM KSRTC Bus Station",
    "Padiyur",
    "Kochuveli Railway Station",
    "THRISSUR KSRTC Bus Station",
    "Palissery",
    "Kaniyapuram Railway Station",
    "TVM CENTRAL KSRTC Bus Station",
    "Pallippuram",
    "Chirayinkeezh Railway Station",
    "TVM CITY KSRTC Bus Station",
    "Paluvai",
    "Varkala Shivagiri Railway Station",
    "VADAKARA KSRTC Bus Station",
    "Panangad",
    "Iravipuram (halt) Railway Station",
    "VADAKKANCHERY KSRTC Bus Station",
    "Pappinivattom",
    "Munroturuttu (halt) Railway Station",
    "VAIKOM KSRTC Bus Station",
    "Parakkad",
    "Ochira Railway Station",
    "VELLANAD KSRTC Bus Station",
    "Paralam",
    "Cheriyanad Railway Station",
    "VELLARADA KSRTC Bus Station",
    "Parappukkara",
    "Changanacheri Railway Station",
    "VENJARAMOODU KSRTC Bus Station",
    "Pavaratty",
    "Kumaranallur (halt) Railway Station",
    "VIKASBHAVAN KSRTC Bus Station",
    "Pazhanji",
    "Kaduturutty (halt) Railway Station",
    "VITHURA KSRTC Bus Station",
    "Perakam",
    "Kanjiramittam (halt) Railway Station",
    "VIZHINJAM KSRTC Bus Station",
    "Peramangalam",
    "Tripunittura Railway Station",
    "Peringandoor",
    "Idappalli Railway Station",
    "Perinjanam",
    "Chovvara (halt) Railway Station",
    "Pookode",
    "Koratti Angadi (halt) Railway Station",
    "Poomangalam",
    "Irinjalakuda Railway Station",
    "Porathissery",
    "Ollur Railway Station",
    "Porkulam",
    "Mulagunnathukavu Railway Station",
    "Pottore",
    "Vallattol Nagar Railway Station",
    "Poyya",
    "Pattambi Railway Station",
    "Pullur",
    "Perssannur (halt) Railway Station",
    "Punnayur",
    "Tirur Railway Station",
    "Punnayurkulam",
    "Vallikunnu Railway Station",
    "Puranattukara",
    "Kallayi Railway Station",
    "Puthukkad",
    "West Hill Railway Station",
    "Puthur",
    "Quilandi Railway Station",
    "Puzhakkal",
    "Payyoli Railway Station",
    "Talikkulam (Thalikulam)",
    "Nadapuram Road Railway Station",
    "Thaikkad",
    "Jagannath Temple Gate Railway Station",
    "Thangalur",
    "Etakkot Railway Station",
    "Thanniyam",
    "Chirakkal Railway Station",
    "Thekkumkara",
    "Kannapuram Railway Station",
    "Tholur",
    "Payyanur Railway Station",
    "Thrissur",
    "Charvattur Railway Station",
    "Trikkur",
    "Bekal Fort Railway Station",
    "Vadakkekad",
    "Kasaragod Railway Station",
    "Vadakkumkara",
    "Manjeshwar Railway Station",
    "Vadakkummuri",
    "Vadama",
    "Vadanappally",
    "Vallachira",
    "Vellanikkara",
    "Vellookkara",
    "Velur",
    "Veluthur",
    "Venginissery",
    "Venkitangu",
    "Venmanad",
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
    validateForm(pickupLocation, e.target.value, selectedHours,agreeTermsAndCondition);
  };

  const handleRate = (e) => {
    const hrs = e.target.value;
    const baseRate = cab.hourlyRate;
    setTotal(hrs * baseRate);
    setSelectedHours(hrs);
    validateForm(pickupLocation, pickupTime, hrs,agreeTermsAndCondition);
  };

  const handleBookNow = async() => {
    if (isFormValid) {
      const bookingResult = {
        location: pickupLocation,
        date: pickupDate,
        time: pickupTime,
        package: `${selectedHours} Hours`,
        vehicle: cab.name
      };
      const data = { ...result, ...bookingResult };
     setIsFormValid(false)
     console.log("Result",result)
     console.log("Booking",bookingResult)
     console.log("DAta",data)
      try {
      const response = await fetch(
        "https://sheet.best/api/sheets/b18968b2-3d8c-4d47-863d-1872d55f6548",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Successfully submitted");
        toast.success("Successfully Booked. We will reach you out for the confirmation")
        onClose()
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    }
  };

  const handleLocation = (location) => {
    setPickupLocation(location);
    setSuggestedLocations([]);
    validateForm(location, pickupTime, selectedHours,agreeTermsAndCondition);
  };

  const handleCheckBox = ()=>{
    setAgreeTermsAndCondition(!agreeTermsAndCondition)
    validateForm(pickupLocation, pickupTime, selectedHours,agreeTermsAndCondition)
  }

  const validateForm = (location, time, hours,agreeTermsAndCondition) => {
    if (location && time && hours && agreeTermsAndCondition===true) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handlePersonalDetailsModal = () => {
    setIsPersonalDetailsModalOpen(!isPersonalDetailsModalOpen);
  };

  const handleTermsAndConditions = ()=>{
    setTermsAndCondition(!termsAndCondition)
  }

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
        <h2 className="text-xl md:text-2xl font-bold mb-2">Book Your Journey</h2>
        <p className="text-xs md:text-sm">
          Choose your preferred ride and let's hit the road!
        </p>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <img className="w-44 rounded-lg" src={cab.image} alt="" />
          <div className="flex flex-col items-center">
            <p className="text-md md:text-lg font-semibold text-black">{cab.name}</p>
            <div className="text-sm flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faUsers} />
              <p>{cab.capacity}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">

          <div className="flex flex-col gap-2 -mt-3">
            <label className="text-xs font-semibold text-black" htmlFor="">Pick-up Location:</label>
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
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => handleLocation(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
            <label className="text-xs font-semibold text-black" htmlFor="">Pick-up Date:</label>
            <input
              type="date"
              placeholder="Travel Date"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setPickupDate(e.target.value)}
            />
            <label className="text-xs font-semibold text-black" htmlFor="">Pick-up Time:</label>

            <div className="flex items-center gap-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              
              <input
                type="time"
                value={pickupTime}
                onChange={handleTimeChange}
                placeholder="Pick-up Time"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full "
              />
            </div>
            <label className="text-xs font-semibold text-black" htmlFor="">Packages:</label>

            <select
              className="px-2 py-1 md:px-3 md:py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleRate}
              value={selectedHours}
            >
              <option value="" disabled>
                Select Package
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}hrs {(i + 1) * 10}kms
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mt-4">
        <input type="checkbox" name="" id="" onClick={handleCheckBox} onChange={handleCheckBox} checked={agreeTermsAndCondition} />
        <p className="text-xs ml-10 text-black" onClick={handleTermsAndConditions}>I accept the <span className="text-blue-500 underline cursor-pointer">Terms and Conditions</span></p>
        </div>
          </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 bg-blue-100 font-semibold px-1 md:py-2 md:px-4 rounded-md transition-colors duration-300 shadow-inner">
              <p className="text-md md:text-lg font-bold text-blue-800">Total Cost:</p>
              <p className="text-lg font-semibold text-blue-600">₹{total}</p>
            </div>
            <p className="text-xs text-black">{`+₹${cab.tax}(Taxes & Charges)`}</p>
          </div>
          <div className="mt-5 md:mt-0 ">
            <button
              className="bg-white text-red-400 font-semibold px-2 md:py-2 md:px-4 mr-2 rounded-md transition-colors duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
           
            <button
              className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-2 md:py-2 md:px-4 rounded-md transition-colors duration-300 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
              onClick={handleBookNow}
              disabled={!isFormValid}
            >
              Book Now
            </button>
            
          </div>
        </div>
      </div>
      { termsAndCondition && (
        <TermsAndConditions
          isOpen={termsAndCondition}
          onClose={handleTermsAndConditions}
          cab={cab}
        />
      )} 
    </Modal>
  );
}

export default BookNow;