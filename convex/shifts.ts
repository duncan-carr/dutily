import { query } from "./_generated/server";
import { v } from "convex/values";

export const getForCalendar = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const shifts = await ctx.db
      .query("shifts")
      .filter((q) => q.eq(q.field("assignedTo"), args.userId))
      .collect();

    return await Promise.all(
      shifts.map(async (shift) => {
        const building = await ctx.db.get(shift.building);
        return {
          ...shift,
          buildingName: building?.name,
        };
      }),
    );
  },
});
