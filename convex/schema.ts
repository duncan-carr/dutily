import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  buildings: defineTable({
    name: v.string(),
  }),
  shifts: defineTable({
    building: v.id("buildings"),
    startTime: v.string(),
    endTime: v.string(),
    shiftType: v.union(
      v.literal("desk"),
      v.literal("coverage"),
      v.literal("night_monitor"),
      v.literal("weekend"),
    ),
    assignedTo: v.id("users"),
  }),
});
