/*
  Warnings:

  - You are about to drop the column `completionDate` on the `defects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "defects" DROP COLUMN "completionDate",
ADD COLUMN     "completion_date" TIMESTAMP(3);
