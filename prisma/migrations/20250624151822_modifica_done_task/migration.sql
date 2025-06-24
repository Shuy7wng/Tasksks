/*
  Warnings:

  - You are about to drop the column `fatto` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `fatto`,
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;
