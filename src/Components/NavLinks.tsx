import { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  children: ReactNode;
  title: string;
};

const NavLinks = ({ children, title }: NavLinkProps) => {
  return <Link to={`/${title}`}>{children}</Link>;
};

export default NavLinks;
