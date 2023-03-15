-- CreateTable
CREATE TABLE `NewNotification` (
    `userId` VARCHAR(191) NOT NULL,
    `newNotification` BOOLEAN NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewNotification` ADD CONSTRAINT `NewNotification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
