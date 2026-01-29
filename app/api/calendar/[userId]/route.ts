// app/api/calendar/[userId]/route.ts
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import ical from "ical-generator";
import { NextRequest } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = await params;

  // 1. Fetch data from Convex
  const events = await convex.query(api.shifts.getForCalendar, { userId });

  // 2. Initialize the Calendar
  const calendar = ical({ name: "ResLife" });

  // 3. Map Convex documents to iCal events
  events.forEach((event) => {
    const shift_title =
      event.shiftType == "desk"
        ? "Desk Shift"
        : event.shiftType == "coverage"
          ? "Coverage"
          : event.shiftType == "weekend"
            ? "Weekend Duty"
            : event.shiftType == "night_monitor"
              ? "Night Monitor"
              : "Event";

    const shift_description =
      event.shiftType == "desk"
        ? "Desk Shift"
        : event.shiftType == "coverage"
          ? "Weekday Coverage Shift"
          : event.shiftType == "weekend"
            ? "Weekend Duty Shift"
            : event.shiftType == "night_monitor"
              ? "Night Monitor Shift"
              : "Generic Shift";

    calendar.createEvent({
      id: event._id,
      start: new Date(event.startTime), // Ensure these are JS Dates or ISO strings
      end: new Date(event.endTime),
      summary: shift_title,
      description: shift_description,
      location: event.buildingName,
    });
  });

  // 4. Return the response with the correct headers
  return new Response(calendar.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="calendar-${userId}.ics"`,
      // Prevent caching if events update frequently
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
