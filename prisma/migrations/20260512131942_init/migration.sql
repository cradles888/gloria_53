CREATE TABLE "ResidentialComplex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "heroImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResidentialComplex_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "complexId" INTEGER NOT NULL,
    "name" TEXT,
    "position" TEXT,
    "address" TEXT,
    "floorsTotal" INTEGER,
    "entrancesTotal" INTEGER,
    "plannedSettlementDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "areaTotal" DECIMAL(8,2) NOT NULL,
    "price" INTEGER NOT NULL,
    "pricePerSqm" INTEGER,
    "floor" INTEGER NOT NULL,
    "entrance" INTEGER,
    "ceilingHeight" DECIMAL(4,2),
    "status" TEXT NOT NULL DEFAULT 'available',
    "layoutType" TEXT,
    "article" TEXT,
    "mainImage" TEXT,
    "planImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ApartmentImage" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "type" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApartmentImage_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ApartmentRoomArea" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "area" DECIMAL(8,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApartmentRoomArea_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ApartmentAmenity" (
    "apartmentId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "ApartmentAmenity_pkey" PRIMARY KEY ("apartmentId","amenityId")
);


CREATE TABLE "PurchaseOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PurchaseOption_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "purchaseOptionId" INTEGER,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "ResidentialComplex_slug_key" ON "ResidentialComplex"("slug");


CREATE UNIQUE INDEX "Amenity_slug_key" ON "Amenity"("slug");


ALTER TABLE "Building" ADD CONSTRAINT "Building_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES "ResidentialComplex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "ApartmentImage" ADD CONSTRAINT "ApartmentImage_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ApartmentRoomArea" ADD CONSTRAINT "ApartmentRoomArea_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ApartmentAmenity" ADD CONSTRAINT "ApartmentAmenity_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ApartmentAmenity" ADD CONSTRAINT "ApartmentAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "Application" ADD CONSTRAINT "Application_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "Application" ADD CONSTRAINT "Application_purchaseOptionId_fkey" FOREIGN KEY ("purchaseOptionId") REFERENCES "PurchaseOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
