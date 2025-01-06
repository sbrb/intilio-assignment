//Q3: Write a program to highlight the current date in calendar using react?
import React, { useState } from "react";

const GenerateCalender = (month, year) => {
  const date = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = date.getDay();
  const calender = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) week.push(null);
      else if (day <= daysInMonth) week.push(day++);
      else week.push(null);
    }
    calender.push(week);
    if (day > daysInMonth) break;
  }
  return calender;
};

const Calender = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const currentDay = today.getDate();
  const calender = GenerateCalender(currentMonth, currentYear);

  return (
    <div
      style={{
        width: "300px",
        margin: "auto",
        marginTop: "100px",
        background: "gray",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <h2>
        {today.toLocaleString("default", { month: "long" })} {currentYear}{" "}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={{ textAlign: "center" }}>
            {day}
          </div>
        ))}
        {calender.map((week, index) =>
          week.map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center",
                backgroundColor: day === currentDay ? "lightblue" : "white",
              }}
            >
              {day}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calender;
