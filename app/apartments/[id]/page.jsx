import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ApartmentHeroGallery from "@/components/Apartments/ApartmentHeroGallery";
import ApartmentInfoPanel from "@/components/Apartments/ApartmentInfoPanel";
import SimilarApartments from "@/components/Apartments/SimilarApartments";

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

const buildGallery = (apartment, sortedImages) => {
  const seen = new Set();
  const gallery = [];

  const add = (item) => {
    if (item.src && !seen.has(item.src)) {
      seen.add(item.src);
      gallery.push(item);
    }
  };

  add({
    src: apartment.mainImage,
    caption: "Планировка квартиры",
    alt: `Планировка квартиры №${apartment.number}`,
    type: "layout",
  });

  add({
    src: apartment.planImage,
    caption: "План этажа",
    alt: `План этажа, квартира №${apartment.number}`,
    type: "floor_plan",
  });

  sortedImages.forEach((img) =>
    add({
      src: img.url,
      caption: img.title || "Фото квартиры",
      alt: img.title || `Квартира №${apartment.number}`,
      type: img.type,
    }),
  );

  return gallery;
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

    floor: apartment.floor,
    entrance: apartment.entrance,
    ceilingHeight: apartment.ceilingHeight
      ? apartment.ceilingHeight.toString()
      : "",

    status: apartment.status,
    apartmentType: apartment.layoutType || "Квартира",

    mainImage: apartment.mainImage || sortedImages[0]?.url || "",
    planImage: apartment.planImage || "",

    buildingPosition: apartment.building.position || "",
    floorsTotal: apartment.building.floorsTotal,
    entrancesTotal: apartment.building.entrancesTotal,
    settlementDate: formatSettlementDate(
      apartment.building.plannedSettlementDate,
    ),

    complexName: apartment.building.complex.name,
    complexAddress: apartment.building.complex.address,
    buildingAddress: apartment.building.address,
    complexId: apartment.building.complexId,

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

    images: buildGallery(apartment, sortedImages),
  };
};

const getApartment = async (id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  const apartment = await prisma.apartment.findUnique({
    where: {
      id: numericId,
    },
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
  });

  if (!apartment) return null;

  return serializeApartment(apartment);
};

const toCardShape = (apt) => {
  const sorted = [...apt.images].sort((a, b) => a.sortOrder - b.sortOrder);
  return {
    id: apt.id,
    number: apt.number,
    rooms: apt.rooms,
    areaTotal: apt.areaTotal.toString(),
    price: apt.price,
    pricePerSqm: apt.pricePerSqm,
    mainImage: apt.mainImage || sorted[0]?.url || "",
    imageAlt: `Планировка квартиры №${apt.number}`,
    buildingPosition: apt.building.position || "",
    floor: apt.floor,
    floorsTotal: apt.building.floorsTotal,
    amenityItems: apt.amenities.map((i) => ({
      id: i.amenity.id,
      name: i.amenity.name,
      slug: i.amenity.slug,
      icon: i.amenity.icon,
    })),
  };
};

const getSimilarApartments = async (current) => {
  const pool = await prisma.apartment.findMany({
    where: {
      status: "available",
      id: { not: current.id },
      building: { complexId: current.complexId },
    },
    include: {
      building: { include: { complex: true } },
      images: { orderBy: { sortOrder: "asc" } },
      amenities: { include: { amenity: true } },
    },
  });

  const area = parseFloat(current.areaTotal);
  const byAreaCloseness = (a, b) =>
    Math.abs(parseFloat(a.areaTotal) - area) -
    Math.abs(parseFloat(b.areaTotal) - area);

  const sameRooms = pool
    .filter((a) => a.rooms === current.rooms)
    .sort(byAreaCloseness);
  const others = pool
    .filter((a) => a.rooms !== current.rooms)
    .sort(byAreaCloseness);

  return [...sameRooms, ...others].slice(0, 5).map(toCardShape);
};

export default async function ApartmentPage({ params, searchParams }) {
  const { id } = await params;
  const { success } = await searchParams;

  const apartment = await getApartment(id);

  if (!apartment) {
    notFound();
  }

  const purchaseOptions = (
    await prisma.purchaseOption.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    })
  ).map((option) => ({
    id: option.id,
    name: option.name,
    description: option.description || "",
  }));

  const similar = await getSimilarApartments(apartment);

  const apartmentTitle = `${apartment.rooms}-комнатная квартира, ${apartment.areaTotal} м²`;

  return (
    <main className="container-padding">
      <section className="section">
        <div className="grid min-w-0 gap-6  rounded-4xl bg-dark10 p-3  sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
          <ApartmentHeroGallery
            images={apartment.images}
            apartmentTitle={apartmentTitle}
          />

          <ApartmentInfoPanel
            apartment={apartment}
            purchaseOptions={purchaseOptions}
            showSuccess={success === "1"}
          />
        </div>

        <SimilarApartments items={similar} />
      </section>
    </main>
  );
}
