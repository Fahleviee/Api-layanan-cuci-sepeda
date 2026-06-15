/*
  Warnings:

  - A unique constraint covering the columns `[noHp]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customer_noHp_key` ON `Customer`(`noHp`);
