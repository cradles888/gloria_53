import { amenitiesData, iconsMap } from '../../data/amenities';

const AmenityItem = ({ amenityId, className, classNameSpan }) => {
  const amenity = amenitiesData.find(a => a.id === amenityId);
  if (!amenity) return null;
  
  const Icon = iconsMap[amenity.iconKey];
  
  return Icon ? (
    <div className={`flex items-center gap-2 p-2 min-w-min bg-accent25 rounded-4xl whitespace-nowrap ${className}`}>
      <Icon className="w-5 h-5 text-dark80" />
      <span className={classNameSpan}>{amenity.name}</span>
    </div>
  ) : null;
};

export default AmenityItem;