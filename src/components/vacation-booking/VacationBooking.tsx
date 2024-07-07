import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { axiosApi } from "../../screens/main/MainScreen";
import timeGridPlugin from "@fullcalendar/timegrid";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { v4 as uuidV4 } from "uuid";
import { VacationStatusEnum } from "./VacationStatusEnum";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import {
  EventI,
  UserRole,
  UserViewModel,
  VacationI,
} from "../../interfaces/types";
import {
  BOOK_IN_PAST,
  BOOKING_BEFORE_START_VACATION,
  CANNOT_BOOK_IN_MOMENT,
  REQUEST_MUCH_VACATION_DAYS,
  REQUEST_SENT_EXPLANATION,
  REQUEST_SENT_SUCCESSFULLY,
} from "../../core/messages";
import { getLocalizedMessage } from "../../core/utils/utils";

interface VacationProps {
  user: UserViewModel;
  vacationDays: number;
  vacations: VacationI[];
}

const VacationBooking = ({ user, vacationDays, vacations }: VacationProps) => {
  const [events, setEvents] = useState<EventI[]>([]);
  const calendarRef = useRef(null);
  const vacationNumber: any = localStorage.getItem("x-number") || 0;

  useEffect(() => {
    const getHolidays = async () => {
      await axiosApi.get("/holidays").then((res) => {
        const holidayEvents = res.data.map((holiday: EventI) => {
          return {
            title: holiday.title,
            description: holiday.description,
            start: holiday.start,
            end: holiday.end,
            allDay: true,
            classNames: ["holiday-event"],
          };
        });
        setEvents((events: any) => [...events, ...holidayEvents]);
      });
    };

    const getBookedVacation = async () => {
      await axiosApi.get(`/booking-days/`).then((res) => {
        const vacationEvents = res.data.map((vacation: any) => {
          let classNames = [];
          if (vacation.status === "Approved") {
            classNames.push("vacation-event-approved");
          } else if (vacation.status === "Rejected") {
            classNames.push("vacation-event-rejected");
          } else if (vacation.status === "Pending") {
            classNames.push("vacation-event-pending");
          }

          return {
            title: vacation.title,
            description: vacation.description,
            start: vacation.start,
            end: vacation.end,
            allDay: true,
            classNames: classNames,
          };
        });
        setEvents((events: any) => [...events, ...vacationEvents]);
      });
    };

    getBookedVacation();
    getHolidays();
  }, []);

  const handleSelect = (selectInfo: any) => {
    console.log(new Date(vacations[0].startAt).getTime(), new Date().getTime());
    if (vacations && new Date(vacations[0].startAt) > new Date()) {
      toast.error(getLocalizedMessage(BOOKING_BEFORE_START_VACATION));
      return;
    }

    if (!vacationDays) {
      toast.error(getLocalizedMessage(CANNOT_BOOK_IN_MOMENT));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set current time to 00:00:00

    if (selectInfo.start < today) {
      toast.error(getLocalizedMessage(BOOK_IN_PAST));
      return;
    }

    let count = 0;
    let date = new Date(selectInfo.startStr);
    while (date <= selectInfo.end) {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }

    if (vacations && count > vacations[0].days) {
      toast.error(getLocalizedMessage(REQUEST_MUCH_VACATION_DAYS));
      return;
    }

    if (count > vacationNumber) {
      toast.error(getLocalizedMessage(REQUEST_MUCH_VACATION_DAYS));

      return;
    }

    if (count > 0) {
      const title = prompt(getLocalizedMessage(REQUEST_SENT_EXPLANATION));

      if (title) {
        const newEvent = {
          id: uuidV4(),
          title: user.firstName + " " + user.lastName,
          description: title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          userId: user.id,
          allDay: true,
          bookedDays: count,
          user: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          status: VacationStatusEnum.Pending,
          editable: true,
          vacationId: vacations[0].id,
        };

        // setEvents([...events, newEvent]);

        // eslint-disable-next-line
        axiosApi.post("/booking-days", newEvent).then((res) => {
          console.log(res.data);
        });

        // eslint-disable-next-line
        axiosApi.post("/booking-requests", newEvent).then((res) => {
          console.log(res.data);
        });

        toast.success(getLocalizedMessage(REQUEST_SENT_SUCCESSFULLY));
      }
    }
  };

  const handleEventMount = (info: any) => {
    const eventElement = info.el;
    const eventTitle = info.event.title;
    const eventDescription = info.event.extendedProps.description;

    // Add a tooltip to the event element
    tippy(eventElement, {
      content: `<strong>${eventTitle}</strong><br>${eventDescription}`,
      allowHTML: true,
      theme: "light",
      placement: "top",
    });
  };

  return (
    <>
      <Box
        className="calendar-container"
        sx={{
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          margin: "auto",
          marginTop: "3%",
          width: "70%",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialDate={new Date()}
          businessHours={true}
          editable={user && user.role === UserRole.Admin ? true : false}
          selectable={true}
          initialView={"dayGridMonth"}
          select={handleSelect}
          events={events}
          ref={calendarRef}
          // INFO: 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday
          firstDay={1}
          eventDisplay="block"
          eventDidMount={handleEventMount}
          dragScroll={true}
          navLinks={true}
        />
      </Box>
    </>
  );
};

export default VacationBooking;
