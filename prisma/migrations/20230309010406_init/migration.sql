-- AlterTable
ALTER TABLE `job` MODIFY `description` VARCHAR(500) NOT NULL,
    MODIFY `benefits` VARCHAR(500) NOT NULL,
    MODIFY `requirements` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `description` VARCHAR(500) NULL;
