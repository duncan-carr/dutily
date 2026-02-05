import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(
      v.union(
        v.literal("admin"),
        v.literal("hall_director"),
        v.literal("community_assistant"),
        v.literal("night_monitor"),
      ),
    ),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
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
  terms: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
  }),
});
