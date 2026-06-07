-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_apartmentId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'purchase',
ALTER COLUMN "apartmentId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Application_type_idx" ON "Application"("type");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
