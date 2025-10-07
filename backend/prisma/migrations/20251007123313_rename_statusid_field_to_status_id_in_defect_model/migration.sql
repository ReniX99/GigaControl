/*
  Warnings:

  - You are about to drop the column `statusId` on the `defects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."defects" DROP CONSTRAINT "defects_statusId_fkey";

-- AlterTable
ALTER TABLE "defects" DROP COLUMN "statusId",
ADD COLUMN     "status_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "defects" ADD CONSTRAINT "defects_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "stasuses"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
