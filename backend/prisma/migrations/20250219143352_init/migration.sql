/*
  Warnings:

  - You are about to drop the column `routine_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoryId` on the `routines` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `routines` table. All the data in the column will be lost.
  - You are about to drop the column `timeRange` on the `routines` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `routines` table. All the data in the column will be lost.
  - Added the required column `activity_id` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_routine_id_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_unitId_fkey";

-- DropForeignKey
ALTER TABLE "routines" DROP CONSTRAINT "routines_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "routines" DROP CONSTRAINT "routines_unitId_fkey";

-- DropForeignKey
ALTER TABLE "subcategories" DROP CONSTRAINT "subcategories_category_id_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "routine_id",
DROP COLUMN "unitId",
ADD COLUMN     "activity_id" TEXT NOT NULL,
ADD COLUMN     "unit_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "routines" DROP COLUMN "subcategoryId",
DROP COLUMN "time",
DROP COLUMN "timeRange",
DROP COLUMN "unitId";

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time_range" "time_range" NOT NULL,
    "time" TEXT NOT NULL,
    "subcategory_id" TEXT NOT NULL,
    "routine_id" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
