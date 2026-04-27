/*
  Warnings:

  - You are about to drop the column `from` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Bus` table. All the data in the column will be lost.
  - Added the required column `fromCityId` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toCityId` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "fromCityId" INTEGER NOT NULL,
ADD COLUMN     "toCityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_fromCityId_fkey" FOREIGN KEY ("fromCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_toCityId_fkey" FOREIGN KEY ("toCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
