export const amenitiesData = [
  { id: 1, name: "Предчистовая отделка", iconKey: "roughFinish" },
  { id: 2, name: "Подогрев полов", iconKey: "floorHeating" },
  { id: 3, name: "Раздельный с/у", iconKey: "separateBathroom" },
  { id: 4, name: "Кондиционер", iconKey: "airConditioner" },
  { id: 5, name: "Балкон", iconKey: "balcony" },
];

import {
  RoughFinishIcon,
  FloorHeatingIcon,
  SeparateBathroomIcon,
  AirConditionerIcon,
  BalconyIcon,
} from '../icons';

export const iconsMap = {
  roughFinish: RoughFinishIcon,
  floorHeating: FloorHeatingIcon,
  separateBathroom: SeparateBathroomIcon,
  airConditioner: AirConditionerIcon,
  balcony: BalconyIcon,
};