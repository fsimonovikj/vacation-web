import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { v4 as uuidV4 } from "uuid";
import { VacationStatusEnum } from "./VacationStatusEnum";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import {
  BookingRequestI,
  EventI,
  UserRole,
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
import { useAuth } from "../../auth/core/Auth";
import CodefixClient from "../../services/CodefixClient";

const VacationBooking = () => {
  const [vacations, setVacations] = useState<VacationI[]>([]);
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [events, setEvents] = useState<EventI[]>([]);
  const calendarRef = useRef(null);
  const client = new CodefixClient();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const days = await client.receiveVacationDays(user!.id as string);
        const vacations = await client.receiveVacations(user!.id as string);
        const booked = await client.receiveBookedVacations();
        const holidays = await client.receiveHolidays();

        setVacationDays(days);
        setVacations(vacations);

        const allEvents = [
          ...booked.map((event: EventI) => ({
            ...event,
            classNames: getClassNamesForStatus(event.status),
          })),
          ...holidays.map((event: EventI) => ({
            ...event,
            classNames: ["holiday-event"],
          })),
        ];
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching vacation days:", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const getClassNamesForStatus = (status: VacationStatusEnum) => {
    switch (status) {
      case VacationStatusEnum.Approved:
        return ["vacation-event-approved"];
      case VacationStatusEnum.Rejected:
        return ["vacation-event-rejected"];
      case VacationStatusEnum.Pending:
        return ["vacation-event-pending"];
      default:
        return [];
    }
  };

  const handleSelect = (selectInfo: any) => {
    if (!vacations || !vacationDays) {
      toast.error(getLocalizedMessage(CANNOT_BOOK_IN_MOMENT));
      return;
    }

    if (vacations && new Date(vacations[0].startAt) > new Date()) {
      toast.error(getLocalizedMessage(BOOKING_BEFORE_START_VACATION));
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

    if (count > 0) {
      const title = prompt(getLocalizedMessage(REQUEST_SENT_EXPLANATION));

      if (title && user) {
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

        (async () => {
          await client.requestBookingDays(newEvent as BookingRequestI);
          await client.requestBookingRequest(newEvent as BookingRequestI);

          toast.success(getLocalizedMessage(REQUEST_SENT_SUCCESSFULLY));
        })();
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
          justifyContent: "center",
          alignItems: "center",
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
