"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const FullDayMonth = () => {
  interactionPlugin;
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (arg:any) => {
    console.log("arg", arg);
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1">
        <FullCalendar
          // plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            center: "",
            right: "dayGridMonth,timeGridWeek,timeGridDay prev,next",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "event 1", date: "2025-07-01" },
            { title: "event 2", date: "2019-04-02" },
          ]}
          eventClick={(info) => {
            console.log("Event clicked:", info);
          }}
          select={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>

      <div className="w-[400px] bg-red-500"></div>
    </div>
  );
};

export default FullDayMonth;
