import { ChangeEvent, FormEvent, useState } from "react";
import { DateTime } from "../pages/Schedule/Schedule";
import AppointmentEndpoint from "../network/endpoints/AppointmentEndpoint";
import Appointment from "../interfaces/Appointment";
import { format } from "date-fns";

type YourInformationFormProps = {
  dateTime: DateTime;
  serviceId: string | undefined;
};

const YourInformationForm = ({
  dateTime,
  serviceId,
}: YourInformationFormProps) => {
  //   const [info, setInfo] = useState({
  //     firstName: "",
  //     lastName: "",
  //     phoneNumber: "+1",
  //     email: "",
  //   });

  //   const { firstName, lastName, phoneNumber, email } = info;

  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setInfo((prev) => {
  //       return {
  //         ...prev,
  //         [name]: value,
  //       };
  //     });
  //   };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: Appointment = {
      time: dateTime.time,
      date: format(dateTime.date!, "yyyy-MM-dd"),
      serviceIds: [serviceId!],
    };

    AppointmentEndpoint.create(payload).then((response) =>
      console.log(response)
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mt-4 text-xs font-bold">Your Information</div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4">
        {/* <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">FIRST NAME</label>
            <input
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 text-sm focus:outline-none focus:border-black"
              placeholder="First Name ..."
              value={firstName}
              name="firstName"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">LAST NAME</label>
            <input
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 text-sm focus:outline-none focus:border-black"
              placeholder="Last Name ..."
              value={lastName}
              name="lastName"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">PHONE</label>
            <input
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 text-sm focus:outline-none focus:border-black"
              placeholder=""
              type="text"
              value={phoneNumber}
              name="phoneNumber"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <input
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 text-sm focus:outline-none focus:border-black"
              placeholder="Email ..."
              value={email}
              name="email"
              type="email"
            />
          </div>
        </div> */}
        <button
          type="submit"
          className="bg-black text-white font-bold text-xs py-8 mt-8"
        >
          COMPLETE APPOINTMENT
        </button>
      </form>
    </div>
  );
};

export default YourInformationForm;
