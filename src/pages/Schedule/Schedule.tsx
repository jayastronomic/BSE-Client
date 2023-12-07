import { useEffect, useState } from "react";
import ServiceEndpoint from "../../network/endpoints/ServiceEndpoint";
import { useParams } from "react-router-dom";
import Service from "../../interfaces/Service";
import ServiceSelectionCard from "../../cards/ServiceSelectionCard";
import BookingCalender from "../../components/BookingCalender";
import YourInformationForm from "../../components/YourInformationForm";
import Appointment from "../../interfaces/Appointment";

export type DateTime = {
  time?: string;
  date?: Date;
};

const Schedule = () => {
  const [appointment, setAppointment] = useState<Appointment>({});
  const [service, setService] = useState<Service | null>(null);
  const [dateTime, setDateTime] = useState<DateTime>({});
  const [hideForm, setHideForm] = useState<boolean>(false);
  const [hideBookingCalender, setHideBookingCalender] = useState<boolean>(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    ServiceEndpoint.show(id!).then((response) => {
      const { data, status } = response;
      if (status === "success") {
        setService(data as Service);
        setAppointment((prev) => ({ ...prev, serviceIds: [id!] }));
      }
    });
  }, [id]);

  return (
    <div className="flex flex-col h-full items-center px-10 pb-10  bg-white overflow-auto">
      <div className="font-semibold my-10">Date & Time</div>
      <div className="text-sm self-start mb-2 font-semibold">Appointment</div>
      <div className="flex flex-col space-y-4">
        <ServiceSelectionCard {...service} dateTime={dateTime} />
        {hideBookingCalender && (
          <BookingCalender
            setDateTime={setDateTime}
            setHideBookingCalender={setHideBookingCalender}
            setHideForm={setHideForm}
            setAppointment={setAppointment}
          />
        )}
        {hideForm && <YourInformationForm appointment={appointment} />}
      </div>
    </div>
  );
};

export default Schedule;
