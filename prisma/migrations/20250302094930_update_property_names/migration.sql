/*
  Warnings:

  - You are about to drop the column `orderIndex` on the `QuestionSetItem` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `SessionQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `questionIndex` on the `SessionQuestion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionSetId,questionNumber]` on the table `QuestionSetItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionNumber` to the `QuestionSetItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionNumber` to the `SessionQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "QuestionSetItem_questionSetId_orderIndex_key";

-- DropIndex
DROP INDEX "SessionQuestion_sessionId_questionIndex_idx";

-- AlterTable
ALTER TABLE "QuestionSetItem" DROP COLUMN "orderIndex",
ADD COLUMN     "questionNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SessionQuestion" DROP COLUMN "errorMessage",
DROP COLUMN "questionIndex",
ADD COLUMN     "questionNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QuestionSetItem_questionSetId_questionNumber_key" ON "QuestionSetItem"("questionSetId", "questionNumber");

-- CreateIndex
CREATE INDEX "SessionQuestion_sessionId_questionNumber_idx" ON "SessionQuestion"("sessionId", "questionNumber");
