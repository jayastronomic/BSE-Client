import { FC } from "react";
import { Appointments } from "../typealiases/typealiases";
import AppointmentCard from "../cards/AppointmentCard";

type UserAppointmentsContainerProps = {
  appointments: Appointments;
};
const UserAppointmentsContainer: FC<UserAppointmentsContainerProps> = ({
  appointments,
}) => {
  return (
    <div className="flex flex-col w-full space-y-2 border-b py-2">
      {appointments.map((appointment) => {
        return (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        );
      })}
    </div>
  );
};

export default UserAppointmentsContainer;
