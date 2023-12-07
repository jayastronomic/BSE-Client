import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import AppointmentEndpoint from "../../network/endpoints/AppointmentEndpoint";
import Appointment from "../../interfaces/Appointment";
import { isBefore, parse } from "date-fns";
import UserAppointmentsContainer from "../../containers/UserAppointmentsContainer";
import { ThreeDots } from "react-loader-spinner";

const Appointments = () => {
  const { data: appointments, isLoading } = useFetch({
    queryFn: AppointmentEndpoint.authUserAppointments,
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (appointments) {
      const currentDate = new Date();
      const upcoming: Appointment[] = [];
      const past: Appointment[] = [];
      appointments.forEach((appointment) => {
        const appointmentDate = parse(
          appointment.date + " " + appointment.time,
          "yyyy-MM-dd h:mma",
          new Date()
        );
        if (isBefore(appointmentDate, currentDate)) {
          past.push(appointment);
        } else {
          upcoming.push(appointment);
        }
      });
      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
    }
    setLoading(false);
  }, [appointments, setLoading]);

  return (
    <div className="flex-1 flex flex-col p-4 overflow-auto">
      <div className="text-2xl font-semibold text-gray-700">Appointments</div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ThreeDots color="gray" />
        </div>
      ) : (
        <>
          <div className="text-sm">UPCOMING APPOINTMENTS</div>
          {upcomingAppointments.length === 0 ? (
            <div className="text-gray-300 font-semibold border-b pb-2">
              NO UPCOMING APPOINTMENTS
            </div>
          ) : (
            <UserAppointmentsContainer appointments={upcomingAppointments} />
          )}
          {pastAppointments.length === 0 ? null : (
            <>
              <div className="text-sm mt-4">PAST APPOINTMENTS</div>
              <UserAppointmentsContainer appointments={pastAppointments} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Appointments;
