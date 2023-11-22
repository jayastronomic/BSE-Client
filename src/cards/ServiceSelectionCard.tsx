import { Link, useLocation } from "react-router-dom";
import { DateTime } from "../pages/Schedule/Schedule";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type ServiceSelectionCardProps = {
  id?: string;
  name?: string;
  description?: string;
  duration?: number;
  dateTime?: DateTime;
};

const ServiceSelectionCard = ({
  id,
  name,
  description,
  duration,
  dateTime,
}: ServiceSelectionCardProps) => {
  const location = useLocation();
  const { time, date } = dateTime || {};
  return (
    <div className="flex flex-col border-b border-amber-900 p-4 border-opacity-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col">
          <div className="text-sm">{name}</div>
          <div className="text-sm text-gray-600">{duration} min</div>
          <div className="text-sm text-gray-600">
            {date ? format(date, "EEEE, MMMM do, yyyy") : ""}
          </div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
        <div>
          {location.pathname === "/book" ? (
            <Link
              to={`/book/${id}`}
              className="bg-amber-900 text-white text-[0.6rem] p-2 rounded shadow-lg hover:bg-opacity-90 transition"
            >
              BOOK
            </Link>
          ) : null}
        </div>
      </div>
      <div className="flex text-sm text-gray-800">{description}</div>
    </div>
  );
};

export default ServiceSelectionCard;
