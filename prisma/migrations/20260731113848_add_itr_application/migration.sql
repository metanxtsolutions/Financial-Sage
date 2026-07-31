-- CreateEnum
CREATE TYPE "ItrType" AS ENUM ('ITR_1', 'ITR_2', 'ITR_3', 'ITR_4');

-- CreateEnum
CREATE TYPE "ItrApplicationStatus" AS ENUM ('PAYMENT_PENDING', 'PAYMENT_RECEIVED', 'DOCUMENTS_PENDING', 'UNDER_REVIEW', 'NEED_CLARIFICATION', 'FILED', 'COMPLETED');

-- CreateTable
CREATE TABLE "ItrApplication" (
    "id" TEXT NOT NULL,
    "itrType" "ItrType" NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "state" TEXT,
    "amount" INTEGER NOT NULL,
    "status" "ItrApplicationStatus" NOT NULL DEFAULT 'PAYMENT_PENDING',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItrApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItrDocument" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItrDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItrDocument" ADD CONSTRAINT "ItrDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "ItrApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
