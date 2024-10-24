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
  REQUEST_SENT_SUCCESSFULLY,
} from "../../core/messages";
import { getLocalizedMessage } from "../../core/utils/utils";
import { useAuth } from "../../auth/core/Auth";
import CodefixClient from "../../services/CodefixClient";
import "../../styles/calendar.scss";
import VacationRequestModal from "./VacationRequestModal";

const VacationBooking = () => {
  const [vacations, setVacations] = useState<VacationI[]>([]);
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [events, setEvents] = useState<EventI[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedInfo, setSelectedInfo] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
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
            display: "background",
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

    console.log(`SELECT INFO`, selectInfo);

    console.log(
      `new Date(vacations[0].startAt)`,
      new Date(vacations[0].startAt)
    );
    console.log(`new date`, new Date());
    if (vacations && new Date(vacations[0].startAt) > new Date()) {
      toast.error(getLocalizedMessage(BOOKING_BEFORE_START_VACATION));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set current time to 00:00:00
    const startDate = new Date(selectInfo.start);
    const endDate = new Date(selectInfo.end);

    if (startDate < today) {
      toast.error(getLocalizedMessage(BOOK_IN_PAST));
      return;
    }

    // Adjust endDate to ensure it doesn't include the end date itself if it's a weekend
    if (startDate < endDate) {
      endDate.setDate(endDate.getDate() - 1);
    }

    // Calculate the number of weekdays (Monday to Friday) between the start and end dates
    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Skip Sundays (0) and Saturdays (6)
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (count === 0) {
      toast.error("You can only book vacation days from Monday to Friday.");
      return;
    }

    if (vacations && count > vacations[0].days) {
      toast.error(getLocalizedMessage(REQUEST_MUCH_VACATION_DAYS));
      return;
    }

    setSelectedInfo({ ...selectInfo, count }); // Save the selected info and count
    setOpenModal(true); // Open the modal
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setDescription("");
  };

  const handleSave = async () => {
    if (!description) {
      toast.error("Please enter a description for your vacation.");
      return;
    }
    console.log(`SELECTED INFO`, selectedInfo);

    if (selectedInfo && user) {
      const newEvent = {
        id: uuidV4(),
        title: user.firstName + " " + user.lastName,
        description: description,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr || selectedInfo.startStr,
        userId: user.id,
        allDay: true,
        bookedDays: selectedInfo.count,
        user: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: VacationStatusEnum.Pending,
        editable: true,
        vacationId: vacations[0].id,
      };

      await client.requestBookingDays(newEvent as BookingRequestI);
      await client.requestBookingRequest(newEvent as BookingRequestI);

      setEvents([
        ...events,
        {
          title: newEvent.title,
          description: newEvent.description,
          start: newEvent.start,
          end: newEvent.end,
          allDay: true,
          classNames: "vacation-event-pending",
        },
      ]);

      toast.success(getLocalizedMessage(REQUEST_SENT_SUCCESSFULLY));
      handleCloseModal(); // Close the modal after saving
    }
  };

  const handleNavLinkDayClick = (date: Date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const selectInfo = {
      start: utcDate,
      end: utcDate,
      startStr: utcDate.toISOString().split("T")[0],
      endStr: utcDate.toISOString().split("T")[0],
    };
    handleSelect(selectInfo);
  };

  return (
    <>
      <Box
        className="calendar-container"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            // center: "title",
            right: "prev,next today",
          }}
          initialDate={new Date()}
          businessHours={true}
          editable={user && user.role === UserRole.Admin ? true : false}
          selectable={true}
          initialView="dayGridMonth"
          select={handleSelect}
          events={events}
          ref={calendarRef}
          firstDay={1}
          eventDisplay="block"
          eventDidMount={handleEventMount}
          dragScroll={true}
          navLinks={true}
          height="auto"
          navLinkDayClick={(date) => handleNavLinkDayClick(date)}
        />
      </Box>

      <VacationRequestModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        description={description}
        setDescription={setDescription}
        selectedInfo={selectedInfo}
      />
    </>
  );
};

export default VacationBooking;
