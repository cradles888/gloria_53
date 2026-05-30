import AppartmentCard from "@/components/UI/AppartmentCard";

const SimilarApartments = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="mt-12 lg:mt-16">
      <h2 className="text-2xl font-medium text-dark sm:text-3xl">
        Похожие квартиры
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map((apartment) => (
          <AppartmentCard key={apartment.id} view="grid" apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default SimilarApartments;
