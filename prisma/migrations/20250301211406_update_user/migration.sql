/*
  Warnings:

  - You are about to drop the column `totalCorrectAnswers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalGameSessions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalWrongAnswers` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalCorrectAnswers",
DROP COLUMN "totalGameSessions",
DROP COLUMN "totalWrongAnswers";
