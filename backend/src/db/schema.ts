import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  text,
  boolean,
  integer,
  json,
} from 'drizzle-orm/pg-core';

// Request table
export const request = pgTable('request', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  verb: varchar('verb', { length: 10 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  headers: json('headers'),
  pathParams: json('path_params'),
  queryParams: json('query_params'),
  body: json('body'),
});

// Question table
export const question = pgTable('question', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => request.id),
  questionText: text('question_text').notNull(),
});

// Condition table
export const condition = pgTable('condition', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => question.id),
  conditionText: text('condition_text').notNull(),
});

// Response table
export const response = pgTable('response', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => question.id),
  responseBody: text('response_body').notNull(),
  statusCode: integer('status_code').notNull(),
});

// TestResult table
export const testResult = pgTable('test_result', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => question.id),
  conditionId: uuid('condition_id')
    .notNull()
    .references(() => condition.id),
  result: boolean('result').notNull(),
  reason: varchar('reason', { length: 255 }),
});
