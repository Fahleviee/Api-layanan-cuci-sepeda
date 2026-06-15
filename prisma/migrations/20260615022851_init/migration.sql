/*
  Warnings:

  - Added the required column `totalHarga` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `totalHarga` DOUBLE NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Proses';
