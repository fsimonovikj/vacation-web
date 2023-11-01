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

const VacationBooking = ({ user }: any) => {
  const [events, setEvents] = useState<any>([]);
  const calendarRef = useRef(null);
  const vacationNumber: any = localStorage.getItem("x-number") || 0;

  useEffect(() => {
    const fetchHolidays = async () => {
      // const holidays = await fetchHolidaysForMonth(); // Replace with your own function to fetch holidays
      const holidays = [
        {
          title: "Off day",
          description: "Holiday description",
          start: "2023-06-20",
          end: "2023-06-20",
        },
        {
          title: "Holiday",
          description: "Holiday description",
          startAt: "2023-06-24",
          endAt: "2023-06-24",
        },
        {
          title: "Holiday1",
          description: "Holiday description",
          startAt: "2023-06-14",
          endAt: "2023-06-14",
        },
        {
          title: "Holiday2",
          description: "Holiday description",
          startAt: "2023-06-16",
          endAt: "2023-06-16",
        },
        {
          title: "2th August",
          description: "Holiday description",
          startAt: "2023-08-02",
          endAt: "2023-08-02",
        },
      ];
      const holidayEvents = holidays.map((holiday) => ({
        title: holiday.title,
        description: holiday.description,
        start: holiday.startAt,
        end: holiday.endAt,
        allDay: true,
        classNames: ["holiday-event"],
      }));
      setEvents(holidayEvents);
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

    fetchHolidays();
    getBookedVacation();
  }, []);

  const handleSelect = (selectInfo: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set current time to 00:00:00

    if (selectInfo.start < today) {
      alert("You cannot book dates before today.");
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

    if (count > vacationNumber) {
      alert(
        `You cannot book more than ${vacationNumber} vacation days at a time.`
      );
      return;
    }

    if (count > 0) {
      const title = prompt("Пиши зашто тражиш одмор и куде ке идеш:");

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
        };
        console.log(`newEvent: `, newEvent);
        console.log(`Baranje ke bidne isprateno`, newEvent);
        // setEvents([...events, newEvent]);

        const dbRequest = axiosApi
          .post("/booking-days", newEvent)
          .then((res) => {
            console.log(res.data);
          });

        // console.log(`request sending...`);
        const emailRequest = axiosApi
          .post("/booking-requests", newEvent)
          .then((res) => {
            console.log(res.data);
          });
        console.log(`request sent!`);
        toast.success("Барањето е успешно испратено!");
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
          editable={true}
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
