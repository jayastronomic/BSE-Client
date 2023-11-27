import AuthUser from "../interfaces/AuthUser";
import Nav from "./Nav";

type OverlayProps = {
  authUser: AuthUser;
};

const Overlay = ({ authUser }: OverlayProps) => {
  return (
    <div className="absolute inset-0 flex flex-col h-full items-center justify-center">
      <Nav />
      <div className="flex flex-col flex-1 items-center justify-center w-full">
        <div className="spartan text-3xl text-amber-800">brownSugar</div>
        <div className="neotoric text-xl text-amber-800">Esthetics </div>
      </div>
    </div>
  );
};

export default Overlay;
