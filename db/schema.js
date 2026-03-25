import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImage: text("profile_image"),
});

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name"),
  category: text("category"),
  area: text("area"),
  image: text("image"),
  userId: integer("user_id").references(() => users.id),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({ one }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
}));
