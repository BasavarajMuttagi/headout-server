/*
  Warnings:

  - Added the required column `totalQuestions` to the `QuestionSetItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionSetItem" ADD COLUMN     "totalQuestions" INTEGER NOT NULL;
