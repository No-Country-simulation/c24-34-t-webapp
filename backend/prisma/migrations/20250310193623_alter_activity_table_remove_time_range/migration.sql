/*
  Warnings:

  - You are about to drop the column `time_range` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "time_range";

-- DropEnum
DROP TYPE "time_range";
