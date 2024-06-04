import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from 'react-modal';

function TermsAndConditions({ isOpen, onClose, cab }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 rounded-lg  pt-1 pl-6 pr-1 pb-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      ariaHideApp={false}
    >
      <button onClick={onClose} className="float-right">
        <FontAwesomeIcon icon={faX} className='mr-2 text-red-500'/>
      </button>
      <div className="bg-white text-black">
        <h2 className="text-2xl font-bold mb-2">Terms And Conditions</h2>
        <div className="text-sm">
          <div className="max-h-[70vh] overflow-auto">
          <div className="font-semibold">Driver & Cab details</div>
            Cab operator will be assigned on booking completion. Cab and driver details will be shared up to 1hr prior to departure.
            <br /><br />
            <ul className="list-disc">
              <div className="font-semibold">Inclusions (Included in the Price)</div>
              <li>Driver Allowance</li>
              <li>1 hr(s) and 10 kms included</li>
            </ul>
            <br />
            <ul className="list-disc">
              <div className="font-semibold">Exclusions (Extra Charges)</div>
              <li>Toll ChargesAs applicable</li>
              <li>Parking ChargesAs applicable</li>
              <li>State Tax As applicable</li>
              <li>Fare beyond 10 Kms ₹{cab.extraKm}/km</li>
              <li>Fare beyond 1 Hr ₹{cab.extraMin} per min</li>
            </ul>
            <br />
            <div className="font-semibold">Read before you book!</div>
            <br />
            <ul>
              <div className="font-semibold">Local Travel</div>
              <li>Cab should only be taken to places within the serviceable city. Else driver has the right to deny.</li>
            </ul>
            <ul>
              <div className="font-semibold">Cab Category</div>
              <li>The booking will be for cab type {cab.type} and we do not commit on providing the preferred cab model ({cab.name} etc)</li>
            </ul>
            <ul>
              <div className="font-semibold">Luggage Policy</div>
              <li>{cab.type} has space for {cab.luggage?cab.luggage:"more than 3"} Luggage Bag. However, depending on the number of passengers, luggage can be adjusted in the seating area with driver consent.</li>
            </ul>
            <ul>
              <div className="font-semibold">Driver Details</div>
              <li>Driver details will be shared up to 1 Hr prior to departure. In case the driver/cab that reaches you for pick up is different from what we have communicated, please don't board the cab and call us for assistance.</li>
            </ul>
            <ul>
              <div className="font-semibold">Trip Duration</div>
              <li>Post the package inclusions, extra Km and extra hour charges will apply as mentioned. Parking charges, if applicable, should be paid to the driver directly.</li>
            </ul>
            <ul>
              <div className="font-semibold">Trip Time</div>
              <li>Trip Time will be counted from the pickup time</li>
            </ul>
            <ul>
              <div className="font-semibold">Delays</div>
              <li>Due to traffic or any other unavoidable reason, pickup may be delayed by 30 mins.</li>
            </ul>
            <ul>
              <div className="font-semibold">Charged KM</div>
              <li>The kilometers will be charged starting from pickup location to pickup location</li>
            </ul>
            <ul>
              <div className="font-semibold">Receipts</div>
              <li>You need to collect receipts from the driver for any extra charges paid directly to the driver during the trip. WOGLO is not liable to provide invoices for such amounts.</li>
            </ul>
            <br />
            <div className="font-semibold">Refund Policy</div>
            <br />
            <ul className="list-disc">
              <div className="font-semibold">Cancellation by the Customer:</div>
              <li>Full Refund till 24 hour of departure: If the booking is cancelled 24 hours before the ride, taxes and charges are Fully refunded.</li>
              <li>Partial Refund till 1 hour of departure: If the booking is cancelled 12 hours before the ride, the booking amount is fully refunded and the taxes and charges are not refunded for the fare.</li>
              <li>No Refund after 1 hour: If the cancellation is made within 1 hour of departure there is no refund.</li>
            </ul>
            <ul className="list-disc">
              <div className="font-semibold">Cancellation by the Cab Service:</div>
              <li>If the cab service cancels the booking, a full refund, including taxes and charges, is provided.</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TermsAndConditions;
