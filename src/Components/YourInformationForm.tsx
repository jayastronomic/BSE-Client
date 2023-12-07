import { FormEvent, useContext } from "react";
import { DateTime } from "../pages/Schedule/Schedule";
import AppointmentEndpoint from "../network/endpoints/AppointmentEndpoint";
import Appointment from "../interfaces/Appointment";
import { format } from "date-fns";
import CardPayout from "./CardPayout";
import { AuthContext } from "../App";

type YourInformationFormProps = {
  appointment: Appointment;
};

const YourInformationForm = ({ appointment }: YourInformationFormProps) => {
  const { authUser } = useContext(AuthContext);
  const { profile, email } = authUser || {};
  const { firstName, lastName, phoneNumber } = profile || {};

  return (
    <div className="flex flex-col w-full">
      <div className="mt-4 text-sm font-semibold mb-4">Your Information</div>
      <div className="flex flex-col w-full space-y-2 border p-4 rounded shadow mb-4">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">First Name</div>
          <div>{firstName}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">Last Name</div>
          <div>{lastName}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">Email</div>
          <div>{email}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">Phone Number</div>
          <div>{phoneNumber}</div>
        </div>
      </div>
      <CardPayout appointment={appointment} />
    </div>
  );
};

export default YourInformationForm;
