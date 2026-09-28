CREATE TABLE `reservations` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `code` text NOT NULL,
  `slot_id` text NOT NULL,
  `track` text NOT NULL,
  `session_id` text NOT NULL,
  `date` text NOT NULL,
  `time` text NOT NULL,
  `parent_name` text NOT NULL,
  `phone` text NOT NULL,
  `child_name` text NOT NULL,
  `child_age` text NOT NULL,
  `child_year` text NOT NULL,
  `attendees` integer DEFAULT 1 NOT NULL,
  `status` text DEFAULT 'confirmed' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX `reservations_code_unique` ON `reservations` (`code`);
