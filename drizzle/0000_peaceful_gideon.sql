CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`image_url` varchar(1024),
	`views` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news_distribution_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`news_id` int NOT NULL,
	`website_id` int NOT NULL,
	`status` varchar(50) NOT NULL,
	`error_message` text,
	`distributed_at` timestamp DEFAULT (now()),
	CONSTRAINT `news_distribution_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `target_websites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(1024) NOT NULL,
	`api_key` varchar(255),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `target_websites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `news_distribution_log` ADD CONSTRAINT `news_distribution_log_news_id_news_id_fk` FOREIGN KEY (`news_id`) REFERENCES `news`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `news_distribution_log` ADD CONSTRAINT `news_distribution_log_website_id_target_websites_id_fk` FOREIGN KEY (`website_id`) REFERENCES `target_websites`(`id`) ON DELETE no action ON UPDATE no action;