import React from "react";
import Service from "../interfaces/Service";

const ServiceCard = ({ name, description, duration, price }: Service) => {
  return (
    <div className="flex flex-col items-center space-y-16 border-b border-amber-800 py-8 text-gray-700">
      <div className="text-3xl font-bold">{name}</div>
      <div className="text-sm">
        ${price} - {duration}min
      </div>
      <div className="text-center">{description}</div>
    </div>
  );
};

export default ServiceCard;
