ALTER TABLE "question" ALTER COLUMN "request_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "request" ADD COLUMN "name" varchar(120) DEFAULT 'New Request' NOT NULL;