import * as FaIcon from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ProfileNav = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col border-r px-4 py-2">
      <Link
        className="hover:bg-gray-200 rounded-full p-2 transition"
        to={`/profile/${id}/appointments`}
      >
        <FaIcon.FaRegCalendarAlt size={"1.6rem"} />
      </Link>
    </div>
  );
};

export default ProfileNav;
