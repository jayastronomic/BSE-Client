import React from "react";
import { Link } from "react-router-dom";

const BookAppointmentBanner = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-amber-900 bg-opacity-60 h-48">
      <div className="text-4xl font-thin">Ready to Relax?</div>
      <div className="mt-10">
        <Link
          className="bg-amber-900 text-white text-sm p-8 rounded cursor-pointer transition hover:bg-opacity-90"
          to={"/book"}
        >
          Book an Appointment
        </Link>
      </div>
    </div>
  );
};

export default BookAppointmentBanner;
