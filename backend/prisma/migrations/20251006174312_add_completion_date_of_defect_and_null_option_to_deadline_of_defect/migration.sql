-- AlterTable
ALTER TABLE "defects" ADD COLUMN     "completionDate" TIMESTAMP(3),
ALTER COLUMN "deadline" DROP NOT NULL;
