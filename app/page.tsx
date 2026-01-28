"use client";

import { Filters } from "@/components/Filters";
import { useState, useMemo } from "react";

type WeekDay = {
  date: Date;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  dayName: string;
  dateString: string; // ISO format YYYY-MM-DD
};

function getSunday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getWeekDates(sunday: Date): WeekDay[] {
  const dayNames = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return {
      date,
      dayOfWeek: i,
      dayName: dayNames[i],
      dateString: date.toISOString().split("T")[0],
    };
  });
}

export default function Home() {
  const [selectedSunday, setSelectedSunday] = useState<Date>(
    getSunday(new Date()),
  );

  const weekDates = useMemo(
    () => getWeekDates(selectedSunday),
    [selectedSunday],
  );

  const handleWeekChange = (sundayDate: Date) => {
    setSelectedSunday(sundayDate);
  };

  return (
    <main className="flex">
      <section className="border-r h-screen w-64"></section>

      <section className="p-8 flex-1">
        <Filters onWeekChange={handleWeekChange} />

        <div className="grid grid-cols-7 my-4 border rounded-md">
          {weekDates.map((day) => (
            <div
              key={day.dateString}
              className={`min-h-84 ${day.dayOfWeek !== 0 ? "border-l" : ""}`}
            >
              <div className="w-full flex items-center justify-center border-b py-2">
                <h3 className="font-semibold">
                  {day.dayName} {day.date.getMonth() + 1}/{day.date.getDate()}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
