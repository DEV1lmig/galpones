import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: text('role').notNull().default('user'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  });

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const customers = pgTable('clientes', {
    id: integer('id').primaryKey().notNull(),
    nombre: text('nombre').notNull(),
    apellido: text('apellido').notNull(),
    telefono: text('telefono'),
    cedula: text('cedula').notNull(),
    createdBy: text('created_by').notNull().references(() => user.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
  });

export const articles = pgTable('articulos', {
  id: integer('id').primaryKey().notNull(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion'),
});

export const loans = pgTable('prestamos', {
  id: integer('id').primaryKey().notNull(),
  cliente_id: integer('cliente_id')
    .notNull()
    .references(() => customers.id),
  articulo_id: integer('articulo_id')
    .notNull()
    .references(() => articles.id),
  monto_total: integer('monto_total').notNull(),
  monto_pagado: integer('monto_pagado').notNull(),
  total_cuotas: integer('total_cuotas').notNull(),
  cuotas_restantes: integer('cuotas_restantes').notNull(),
  fecha_prestamo: timestamp('fecha_prestamo').notNull(),
});

export const payments = pgTable('pagos', {
  id: integer('id').primaryKey().notNull(),
  prestamo_id: integer('prestamo_id')
    .notNull()
    .references(() => loans.id),
  fecha_pago: timestamp('fecha_pago').notNull(),
  monto: integer('monto').notNull(),
  tipo_pago: text('tipo_pago').notNull(),
  numero_transaccion: text('numero_transaccion'),
});

// Define relationships
export const customersRelations = relations(customers, ({ many, one }) => ({
    loans: many(loans),
    creator: one(user, {
      fields: [customers.createdBy],
      references: [user.id],
    }),
  }));

export const userRelations = relations(user, ({ many }) => ({
    createdCustomers: many(customers),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
  loans: many(loans),
}));

export const loansRelations = relations(loans, ({ one }) => ({
  customer: one(customers, {
    fields: [loans.cliente_id],
    references: [customers.id],
  }),
  article: one(articles, {
    fields: [loans.articulo_id],
    references: [articles.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  loan: one(loans, {
    fields: [payments.prestamo_id],
    references: [loans.id],
  }),
}));

export type Pagos = typeof payments.$inferSelect

export type Prestamos = typeof loans.$inferSelect

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
