CREATE TABLE `blog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`banner` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`banner` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
