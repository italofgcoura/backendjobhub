/*
  Warnings:

  - You are about to drop the column `applicationId` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_applicationId_fkey`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `applicationId`;
