import { amenitiesData, iconsMap } from '../../data/amenities';
import styles from './Amenity.module.css'

const AmenityList = ({ amenities = [], className = "" }) => {
  const availableAmenities = amenitiesData.filter(amenity => 
    amenities.includes(amenity.id)
  );

  return (
    <div className={`flex gap-2 rounded-4xl ${styles.scrollAmenity} ${className}`}>
      {availableAmenities.map(({ id, name, iconKey }) => {
        const Icon = iconsMap[iconKey];
        
        return Icon ? (
          <div key={id} className="flex items-center gap-2 p-2  min-w-max bg-accent25 rounded-4xl">
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm">{name}</span>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default AmenityList;