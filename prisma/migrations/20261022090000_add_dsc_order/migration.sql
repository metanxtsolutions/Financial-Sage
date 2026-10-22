-- CreateEnum
CREATE TYPE "DscOrderStatus" AS ENUM ('PAYMENT_PENDING', 'PAID', 'KYC_PENDING', 'ISSUED', 'DISPATCHED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "DscOrder" (
    "id" TEXT NOT NULL,
    "dscType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "DscOrderStatus" NOT NULL DEFAULT 'PAYMENT_PENDING',
    "payuTxnId" TEXT,
    "payuPaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DscOrder_pkey" PRIMARY KEY ("id")
);
