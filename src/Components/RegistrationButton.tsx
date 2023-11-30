import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type RegistrationButtonProps = {
  title: string;
  children: ReactNode;
};

const RegistrationButton = (props: RegistrationButtonProps) => {
  return <Link to={`${props.title}`}>{props.children}</Link>;
};

export default RegistrationButton;
