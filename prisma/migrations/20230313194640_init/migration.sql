-- CreateTable
CREATE TABLE `Notification` (
    `notificationId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `applicationId` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `visualized` BOOLEAN NOT NULL,

    PRIMARY KEY (`notificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`applicationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
