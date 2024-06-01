// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  pgTableCreator,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sign-shop_${name}`);

export const batchTable = createTable(
  "batch",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const batchRelations = relations(batchTable, ({ many }) => ({
  batchesToUpcs: many(batchesToUpcsTable),
}));

export const upcTable = createTable("upc", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  size: varchar("size", { length: 16 }).notNull(),
  price: real("price").notNull(),
  buy_x: integer("buy_x").default(1).notNull(),
  get_y: real("get_y").default(0).notNull(),
  digital_deal: boolean("digital_deal").default(false).notNull(),
  sale_price: real("sale_price").default(0).notNull(),
});

export const upcsRelations = relations(upcTable, ({ many }) => ({
  batchesToUpcsTable: many(batchesToUpcsTable),
}));

export const batchesToUpcsTable = createTable("batchUpc", {
  id: serial("id").primaryKey(),
  batchId: serial("batchId")
    .references(() => batchTable.id, { onDelete: "cascade" })
    .notNull(),
  upcId: bigint("upcId", { mode: "number" })
    .references(() => upcTable.id)
    .notNull(),
  selected: boolean("selected")
    .notNull()
    .$default(() => true),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const batchesToUpcsRelations = relations(
  batchesToUpcsTable,
  ({ one }) => ({
    upc: one(upcTable, {
      fields: [batchesToUpcsTable.upcId],
      references: [upcTable.id],
    }),
    batch: one(batchTable, {
      fields: [batchesToUpcsTable.batchId],
      references: [batchTable.id],
    }),
  }),
);
