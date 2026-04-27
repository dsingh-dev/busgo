/*
  Warnings:

  - You are about to drop the column `amenities` on the `Bus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "amenities";

-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusAmenity" (
    "busId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "BusAmenity_pkey" PRIMARY KEY ("busId","amenityId")
);

-- AddForeignKey
ALTER TABLE "BusAmenity" ADD CONSTRAINT "BusAmenity_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAmenity" ADD CONSTRAINT "BusAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
