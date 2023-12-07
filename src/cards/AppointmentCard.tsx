import { FC } from "react";
import Appointment from "../interfaces/Appointment";
import { format, parse } from "date-fns";

type AppointmentCardProps = {
  appointment?: Appointment;
};
const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  if (!appointment) return null;
  const { date, time } = appointment;
  if (!date || !time) return null;
  const dateObject = parse(date!, "yyyy-MM-dd", new Date());
  const monthAsWord = format(dateObject, "MMM");
  const day = format(dateObject, "d");

  return (
    <div className="flex shadow border rounded w-full">
      <div className="justify-center flex flex-col p-2 w-8/12">
        <div className="text-gray-700">Service</div>
        <div className="text-lg font-semibold">Lip/Chin</div>
      </div>
      <div className="flex flex-col border-l items-center justify-center p-2 flex-1">
        <div className="text-gray-700">{monthAsWord}</div>
        <div className="text-2xl font-semibold">{day}</div>
        <div className="text-gray-700">{time}</div>
      </div>
    </div>
  );
};

export default AppointmentCard;
