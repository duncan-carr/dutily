import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db.get(userId);
  },
});

export const row = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const userRole = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), userId))
      .unique();

    return await userRole;
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();
  },
});

export const modifyUserRole = mutation({
  args: {
    userId: v.id("users"),
    newRole: v.union(
      v.literal("admin"),
      v.literal("hall_director"),
      v.literal("community_assistant"),
      v.literal("night_monitor"),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.userId, { role: args.newRole });
  },
});

export const employees = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .filter((q) =>
        q.or(
          q.eq(q.field("role"), "admin"),
          q.eq(q.field("role"), "community_assistant"),
          q.eq(q.field("role"), "night_monitor"),
          q.eq(q.field("role"), "hall_director"),
        ),
      )
      .collect();
  },
});
