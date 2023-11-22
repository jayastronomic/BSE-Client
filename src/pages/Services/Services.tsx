import React, { useEffect, useState } from "react";
import legImage from "../../images/image.jpg";
import ServicesContainer from "../../containers/ServicesContainer";
import Service from "../../interfaces/Service";
import ServiceEndpoint from "../../network/endpoints/ServiceEndpoint";
import BookAppointmentBanner from "../../components/BookAppointmentBanner";

const Services = (): JSX.Element => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    ServiceEndpoint.index().then((response) => {
      const { data: services, message } = response;
      if (message === "success") {
        setServices(services as Service[]);
      }
    });
  }, []);

  return (
    <div className="absolute flex flex-col w-full overflow-visible">
      <div className="relative h-[42rem] overflow-hidden">
        <img alt="leg" src={legImage} />
        <div className="flex absolute inset-0 justify-center items-center font-thin just text-white text-5xl bg-black bg-opacity-20">
          Our Services
        </div>
      </div>
      <ServicesContainer services={services} />
      <BookAppointmentBanner />
    </div>
  );
};

export default Services;
