-- CreateEnum
CREATE TYPE "BusType" AS ENUM ('NONAC', 'AC');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type" "BusType" NOT NULL DEFAULT 'NONAC',
    "from" TEXT,
    "to" TEXT,
    "departure" TIMESTAMP(3),
    "arrival" TIMESTAMP(3),
    "duration" TIMESTAMP(3),
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalSeats" INTEGER,
    "amenities" JSONB,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "bookedSeats" INTEGER,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "busId" INTEGER NOT NULL,
    "seats" INTEGER[],
    "passengerName" TEXT,
    "passengerEmail" TEXT,
    "passengerPhone" TEXT,
    "travelDate" TIMESTAMP(3),
    "totalFare" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Booking_userId_busId_idx" ON "Booking"("userId", "busId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
