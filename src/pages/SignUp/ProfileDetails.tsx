import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import AuthUser from "../../interfaces/AuthUser";

type ProfileDetailsProps = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phoneNumber?: string;
  setNewUser: Dispatch<SetStateAction<AuthUser>>;
};

const ProfileDetails = ({
  firstName,
  lastName,
  birthDate,
  phoneNumber,
  setNewUser,
}: ProfileDetailsProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return {
        ...prev,
        profile: {
          ...prev.profile!,
          [name]: value,
        },
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "circOut" }}
      className="flex flex-col space-y-8"
    >
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">FIRST NAME*</label>
        <input
          placeholder="First Name"
          className={
            "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
          }
          type={"text"}
          name={"firstName"}
          maxLength={50}
          value={firstName}
          onChange={handleChange}
        />
      </div>
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">LAST NAME*</label>
        <input
          placeholder="Last Name"
          className={
            "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
          }
          type={"text"}
          name={"lastName"}
          maxLength={50}
          value={lastName}
          onChange={handleChange}
        />
      </div>
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">BIRTH DATE*</label>
        <input
          placeholder="Birth Date"
          className={
            "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
          }
          type={"date"}
          name={"birthDate"}
          value={birthDate}
          onChange={handleChange}
        />
      </div>
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">PHONE NUMBER*</label>
        <input
          placeholder="Phone Number"
          className={
            "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
          }
          type="text"
          name={"phoneNumber"}
          maxLength={10}
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>
    </motion.div>
  );
};
export default ProfileDetails;
