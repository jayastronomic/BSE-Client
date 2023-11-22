import { Dispatch, SetStateAction, useState } from "react";
import * as dateFns from "date-fns";
import * as FaIcon from "react-icons/fa";
import { DateTime } from "../pages/Schedule/Schedule";

type BookingCalenderProps = {
  setDateTime: Dispatch<SetStateAction<DateTime>>;
  setHideBookingCalender: Dispatch<SetStateAction<boolean>>;
  setHideForm: Dispatch<SetStateAction<boolean>>;
};

const BookingCalender = ({
  setDateTime,
  setHideBookingCalender,
  setHideForm,
}: BookingCalenderProps) => {
  const [currentDate, setcurrentDate] = useState<Date>(new Date());
  const totalDates = dateFns.eachDayOfInterval({
    start: currentDate,
    end: dateFns.addDays(currentDate, 89),
  });

  const [dateSequence, setDateSequence] = useState<number[]>([0, 1, 2]);
  const timeSlots = [
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
  ];

  const shiftDatesRight = () => {
    setDateSequence((prev) => {
      if (prev[2] !== totalDates.length - 1) {
        return [prev[0] + 3, prev[1] + 3, prev[2] + 3];
      } else {
        return prev;
      }
    });
  };

  const shiftDatesLeft = () => {
    setDateSequence((prev) => {
      if (prev[0] !== 0) {
        return [prev[0] - 3, prev[1] - 3, prev[2] - 3];
      } else {
        return prev;
      }
    });
  };

  const selectTime = (time: string, date: Date) => {
    setDateTime((prev) => {
      return {
        time,
        date,
      };
    });
    setHideBookingCalender((prev) => !prev);
    setHideForm((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between p-4">
        {dateSequence[0] === 0 ? (
          <div></div>
        ) : (
          <button onClick={() => shiftDatesLeft()}>
            <FaIcon.FaChevronLeft size={"1.5rem"} />
          </button>
        )}
        {dateSequence[2] === totalDates.length - 1 ? (
          <div></div>
        ) : (
          <button onClick={() => shiftDatesRight()}>
            <FaIcon.FaChevronRight size={"1.5rem"} />
          </button>
        )}
      </div>
      <div className="flex flex-col border w-full">
        <div className="flex px-10 py-3 justify-around">
          {dateSequence.map((sequence) => {
            return (
              <div key={sequence} className="flex flex-col items-center">
                <div>{dateFns.format(totalDates[sequence], "EEEE")}</div>
                <div className="text-sm">
                  {dateFns.format(totalDates[sequence], "MMMM")}{" "}
                  {totalDates[sequence].getDate()}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-around px-6 border p-4">
          <div className="flex flex-col items-center space-y-4">
            {timeSlots.map((time) => {
              return (
                <button
                  onClick={() => selectTime(time, totalDates[dateSequence[0]])}
                  className="shadow p-4"
                >
                  {time}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col items-center space-y-4">
            {timeSlots.map((time) => {
              return (
                <button
                  onClick={() => selectTime(time, totalDates[dateSequence[1]])}
                  className="shadow p-4"
                >
                  {time}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col items-center space-y-4">
            {timeSlots.map((time) => {
              return (
                <button
                  onClick={() => selectTime(time, totalDates[dateSequence[2]])}
                  className="shadow p-4"
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalender;
