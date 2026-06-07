-- CreateTable
CREATE TABLE "ConstructionPhoto" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConstructionPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConstructionPhoto_buildingId_idx" ON "ConstructionPhoto"("buildingId");

-- CreateIndex
CREATE INDEX "ConstructionPhoto_takenAt_idx" ON "ConstructionPhoto"("takenAt");

-- AddForeignKey
ALTER TABLE "ConstructionPhoto" ADD CONSTRAINT "ConstructionPhoto_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;
