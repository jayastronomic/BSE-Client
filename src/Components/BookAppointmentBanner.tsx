import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertBoxContext, AuthContext } from "../App";

const BookAppointmentBanner = () => {
  const { authUser } = useContext(AuthContext);
  const { setLoginAlert } = useContext(AlertBoxContext);
  const navigate = useNavigate();
  const goTo = (path: string) => {
    if (!authUser) {
      setLoginAlert(true);
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-amber-900 bg-opacity-60 h-48">
      <div className="text-4xl font-thin">Ready to Relax?</div>
      <div className="mt-10">
        <Link
          className="bg-amber-900 text-white text-sm p-8 rounded cursor-pointer transition hover:bg-opacity-90"
          to={"/book"}
          onClick={() => goTo("/book")}
        >
          Book an Appointment
        </Link>
      </div>
    </div>
  );
};

export default BookAppointmentBanner;
