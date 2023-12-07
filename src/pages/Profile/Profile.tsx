import { useContext } from "react";
import { AuthContext } from "../../App";
import ProfileViews from "../../components/ProfileViews";

const Profile = () => {
  const { authUser } = useContext(AuthContext);
  const { email, profile } = authUser || {};
  const { firstName, lastName, phoneNumber } = profile || {};
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex border-b w-full py-6 items-center space-x-6 justify-center">
        <div className="flex items-center justify-center rounded-full bg-gray-800 text-white w-32 h-32 text-3xl font-bold hover:opacity-80 transition">
          <span>
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">
            {firstName} {lastName}
          </div>
          <div className="text-xs ">{email}</div>
          <div className="text-xs text-gray-700">{phoneNumber}</div>
        </div>
      </div>
      <ProfileViews />
    </div>
  );
};

export default Profile;
