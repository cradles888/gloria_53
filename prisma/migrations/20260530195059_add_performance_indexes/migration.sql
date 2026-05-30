-- CreateIndex
CREATE INDEX "Apartment_buildingId_idx" ON "Apartment"("buildingId");

-- CreateIndex
CREATE INDEX "Apartment_status_idx" ON "Apartment"("status");

-- CreateIndex
CREATE INDEX "Apartment_buildingId_status_idx" ON "Apartment"("buildingId", "status");

-- CreateIndex
CREATE INDEX "Apartment_buildingId_floor_entrance_idx" ON "Apartment"("buildingId", "floor", "entrance");

-- CreateIndex
CREATE INDEX "ApartmentImage_apartmentId_idx" ON "ApartmentImage"("apartmentId");

-- CreateIndex
CREATE INDEX "ApartmentRoomArea_apartmentId_idx" ON "ApartmentRoomArea"("apartmentId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_apartmentId_idx" ON "Application"("apartmentId");

-- CreateIndex
CREATE INDEX "Building_complexId_idx" ON "Building"("complexId");

-- CreateIndex
CREATE INDEX "Building_complexId_status_idx" ON "Building"("complexId", "status");
