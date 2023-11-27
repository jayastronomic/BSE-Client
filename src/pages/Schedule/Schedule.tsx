import React, { useEffect, useState } from "react";
import ServiceEndpoint from "../../network/endpoints/ServiceEndpoint";
import { useParams } from "react-router-dom";
import Service from "../../interfaces/Service";
import ServiceSelectionCard from "../../cards/ServiceSelectionCard";
import BookingCalender from "../../components/BookingCalender";
import YourInformationForm from "../../components/YourInformationForm";

export type DateTime = {
  time?: string;
  date?: Date;
};

const Schedule = () => {
  const [service, setService] = useState<Service | null>(null);
  const [dateTime, setDateTime] = useState<DateTime>({});
  const [hideForm, setHideForm] = useState<boolean>(false);
  const [hideBookingCalender, setHideBookingCalender] = useState<boolean>(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    ServiceEndpoint.show(id!).then((response) => {
      const { data, status } = response;
      if (status === "success") setService(data as Service);
    });
  }, [id]);

  return (
    <div className="flex flex-col h-full items-center px-10">
      <div className="font-semibold my-10">Date & Time</div>
      <div className="text-sm self-start">Appointment</div>
      <ServiceSelectionCard {...service} dateTime={dateTime} />
      {hideBookingCalender && (
        <BookingCalender
          setDateTime={setDateTime}
          setHideBookingCalender={setHideBookingCalender}
          setHideForm={setHideForm}
        />
      )}
      {hideForm && (
        <YourInformationForm serviceId={service?.id} dateTime={dateTime} />
      )}
    </div>
  );
};

export default Schedule;
