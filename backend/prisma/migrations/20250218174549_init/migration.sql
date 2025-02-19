/*
  Warnings:

  - You are about to drop the column `activity_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `routine_id` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_unitId_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_activity_id_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "activity_id",
ADD COLUMN     "routine_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "activities";

-- CreateTable
CREATE TABLE "routines" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeRange" "time_range" NOT NULL,
    "time" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
