import legImage from "../../images/image.jpg";
import ServicesContainer from "../../containers/ServicesContainer";
import ServiceEndpoint from "../../network/endpoints/ServiceEndpoint";
import BookAppointmentBanner from "../../components/BookAppointmentBanner";
import useFetch from "../../hooks/useFetch";

const Services = (): JSX.Element => {
  const { data } = useFetch({
    queryFn: ServiceEndpoint.index,
  });

  return (
    <div className="absolute flex flex-col w-full overflow-visible">
      <div className="relative h-[42rem] overflow-hidden">
        <img alt="leg" src={legImage} />
        <div className="flex absolute inset-0 justify-center items-center font-thin just text-white text-5xl bg-black bg-opacity-20">
          Our Services
        </div>
      </div>
      <ServicesContainer services={data || []} />
      <BookAppointmentBanner />
    </div>
  );
};

export default Services;
