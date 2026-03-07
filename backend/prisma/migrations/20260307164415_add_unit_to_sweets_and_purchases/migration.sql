-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "unit" VARCHAR(50) NOT NULL DEFAULT 'piece';

-- AlterTable
ALTER TABLE "sweets" ADD COLUMN     "unit" VARCHAR(50) NOT NULL DEFAULT 'piece';
