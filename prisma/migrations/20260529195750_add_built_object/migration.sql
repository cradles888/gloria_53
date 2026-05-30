-- CreateTable
CREATE TABLE "BuiltObject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "coordinates" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "complex" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuiltObject_pkey" PRIMARY KEY ("id")
);
