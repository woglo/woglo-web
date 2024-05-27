import { faGlobe, faPhoneAlt, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-teal-500 to-teal-700 py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between">
          <div className="flex items-center mb-5 md:mb-0">
            <img
              className="w-[90px] h-[50px] md:w-[110px] md:h-[80px] -mt-7"
              src="./images/image (4).png"
              alt="Footer Logo 1"
            />
            <img
              className="w-[130px] h-[80px] md:w-[180px] md:h-[140px]"
              src="./images/image (5).png"
              alt="Footer Logo 2"
            />
            <img
              className="w-[80px] h-[70px] ml-auto mr-auto md:ml-0 md:mr-0 md:w-[90px] md:h-[100px] -mt-4 md:-mt-6"
              src="./images/image (6).png"
              alt="Footer Logo 3"
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 text-white">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                <p>+91-944 66 88 095</p>
              </div>
              
              <div className="flex mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 mt-1" />
                <p className="max-w-xs"><span className='font-semibold'>Main Office : </span>
                WOGLO Technologies Pvt.LTD 14/291 N, Suite 66G, 1st Floor A Square Building Edappally Pukkattupady Road Edathala, P O, Kuzhivelippady, Kochi, Kerala 683561
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <p>Mon-Sat 09.00 - 21.00</p>
              </div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                <p>Sunday CLOSED</p>
              </div>
              <div className="flex">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 mt-1" />
                
                <p className="max-w-xs"><span className='font-semibold'>Branch : </span>
                  M.K.K Building, Between Matha Theatre & Zeenath Theatre (One Way Road), Priyadarshi Road, Periyar Nagar, Near Railway Station, Aluva, Kerala 683101
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;