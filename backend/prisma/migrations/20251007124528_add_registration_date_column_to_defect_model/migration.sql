/*
  Warnings:

  - Added the required column `registration_date` to the `defects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "defects" ADD COLUMN     "registration_date" TIMESTAMP(3) NOT NULL;
