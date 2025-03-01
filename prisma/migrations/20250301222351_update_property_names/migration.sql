/*
  Warnings:

  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `QuestionSet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[city,countryId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[country]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "City_name_countryId_key";

-- DropIndex
DROP INDEX "City_name_idx";

-- DropIndex
DROP INDEX "Country_name_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "name",
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionSet" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "City_city_idx" ON "City"("city");

-- CreateIndex
CREATE UNIQUE INDEX "City_city_countryId_key" ON "City"("city", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_country_key" ON "Country"("country");
