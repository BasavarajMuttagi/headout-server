/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,questionNumber]` on the table `SessionQuestion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionQuestion_sessionId_questionNumber_key" ON "SessionQuestion"("sessionId", "questionNumber");
