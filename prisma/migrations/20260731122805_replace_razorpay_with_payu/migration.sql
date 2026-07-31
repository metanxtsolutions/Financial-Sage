/*
  Warnings:

  - You are about to drop the column `razorpayOrderId` on the `ItrApplication` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayPaymentId` on the `ItrApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ItrApplication" DROP COLUMN "razorpayOrderId",
DROP COLUMN "razorpayPaymentId",
ADD COLUMN     "payuPaymentId" TEXT,
ADD COLUMN     "payuTxnId" TEXT;
