import { prisma } from "@/lib/prisma";
import ApartmentsCatalog from "@/components/Apartments/ApartmentsCatalog";

export const dynamic = "force-dynamic";

const formatSettlementDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 1 && month <= 3) return `1 квартал ${year}`;
  if (month >= 4 && month <= 6) return `2 квартал ${year}`;
  if (month >= 7 && month <= 9) return `3 квартал ${year}`;
  if (month >= 10 && month <= 12) return `4 квартал ${year}`;

  return "";
};

const serializeApartment = (apartment) => {
  const sortedImages = [...apartment.images].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return {
    id: apartment.id,
    number: apartment.number,

    rooms: apartment.rooms,
    areaTotal: apartment.areaTotal.toString(),
    price: apartment.price,
    pricePerSqm: apartment.pricePerSqm,

    mainImage: apartment.mainImage || sortedImages[0]?.url || "",
    planImage: apartment.planImage || "",
    imageAlt: `Планировка квартиры №${apartment.number}`,

    buildingPosition: apartment.building.position || "",
    floor: apartment.floor,
    floorsTotal: apartment.building.floorsTotal,

    entrance: apartment.entrance,
    ceilingHeight: apartment.ceilingHeight
      ? apartment.ceilingHeight.toString()
      : "",

    settlementDate: formatSettlementDate(
      apartment.building.plannedSettlementDate,
    ),

    complexName: apartment.building.complex.name,
    complexAddress: apartment.building.complex.address,
    buildingAddress: apartment.building.address,

    buildingId: apartment.buildingId,
    apartmentType: "Квартира",
    article: apartment.article,

    amenityItems: apartment.amenities.map((item) => ({
      id: item.amenity.id,
      name: item.amenity.name,
      slug: item.amenity.slug,
      icon: item.amenity.icon,
    })),

    roomAreas: apartment.roomAreas.map((room) => ({
      id: room.id,
      name: room.name,
      area: room.area.toString(),
      sortOrder: room.sortOrder,
    })),
  };
};

const getApartmentsPageData = async () => {
  const [apartments, complexes, buildings] = await Promise.all([
    prisma.apartment.findMany({
      include: {
        building: {
          include: {
            complex: true,
          },
        },
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        roomAreas: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    }),

    prisma.residentialComplex.findMany({
      where: { status: "active" },
      orderBy: { id: "asc" },
    }),

    prisma.building.findMany({
      where: { status: "active" },
      include: { complex: true },
      orderBy: { id: "asc" },
    }),
  ]);

  return {
    apartments: apartments.map((apt) => ({ ...serializeApartment(apt), status: apt.status })),
    complexes: complexes.map((complex) => ({
      id: complex.id,
      name: complex.name,
      slug: complex.slug,
    })),
    buildings: buildings.map((building) => ({
      id: building.id,
      position: building.position || "",
      name: building.name || "",
      address: building.address || "",
      floorsTotal: building.floorsTotal,
      heroImage: building.heroImage || "",
      complexId: building.complexId,
      complexName: building.complex.name,
      settlementDate: formatSettlementDate(building.plannedSettlementDate),
    })),
  };
};

const parseInitialFilters = (searchParams) => {
  const rooms = searchParams.rooms
    ? String(searchParams.rooms).split(",").filter(Boolean)
    : [];
  const priceFrom = parseFloat(searchParams.priceFrom);
  const priceTo = parseFloat(searchParams.priceTo);
  return {
    rooms,
    priceRange: [
      isNaN(priceFrom) ? 0 : priceFrom,
      isNaN(priceTo) ? 17 : priceTo,
    ],
  };
};

export default async function ApartmentsPage({ searchParams }) {
  const { apartments, complexes, buildings } = await getApartmentsPageData();
  const resolvedParams = await searchParams;
  const initialFilters = parseInitialFilters(resolvedParams);

  return (
    <ApartmentsCatalog
      apartments={apartments}
      complexes={complexes}
      buildings={buildings}
      initialFilters={initialFilters}
    />
  );
}
