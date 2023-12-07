import Service from "../interfaces/Service";
import ServiceCard from "../cards/ServiceCard";
import { useLocation } from "react-router-dom";
import ServiceSelectionCard from "../cards/ServiceSelectionCard";

type ServicesContainerProps = {
  services: Service[];
};

const ServicesContainer = ({
  services,
}: ServicesContainerProps): JSX.Element => {
  const location = useLocation();

  if (location.pathname === "/book")
    return (
      <div className="flex flex-col px-20 py-10 shadow-lg">
        <div className="flex flex-col space-y-4">
          {services.map((service) => {
            return <ServiceSelectionCard key={service.name} {...service} />;
          })}
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col px-20 py-10">
        {services.map((service) => {
          return <ServiceCard key={service.name} {...service} />;
        })}
      </div>
    );
};

export default ServicesContainer;
