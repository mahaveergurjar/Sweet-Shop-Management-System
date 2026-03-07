/*
  Warnings:

  - You are about to alter the column `unit` on the `purchases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `unit` on the `sweets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "purchases" ALTER COLUMN "unit" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "sweets" ALTER COLUMN "unit" SET DATA TYPE VARCHAR(20);
