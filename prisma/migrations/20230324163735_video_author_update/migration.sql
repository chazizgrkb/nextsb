/*
  Warnings:

  - You are about to drop the column `author` on the `videos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `videos` DROP COLUMN `author`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL DEFAULT 'welpshit';

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
