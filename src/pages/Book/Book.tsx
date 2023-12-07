import { useContext, useEffect, useState } from "react";
import Service from "../../interfaces/Service";
import ServicesContainer from "../../containers/ServicesContainer";
import ServiceEndpoint from "../../network/endpoints/ServiceEndpoint";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else {
      ServiceEndpoint.index().then((response) => {
        const { data, status } = response;
        if (status === "success") setServices(data as Service[]);
      });
    }
  }, [authUser, navigate]);
  return (
    <div className="flex flex-col items-center h-full bg-white">
      <div className="font-semibold my-10">Select Appointment</div>
      <ServicesContainer services={services} />
    </div>
  );
};

export default Book;
