"use client"
import { TbBeach, TbMountain, TbPool, TbWindmill } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import Container from "../Container"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";


export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmill",
    icon: TbWindmill,
    description: "This property has a beautiful windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property has a modern design",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is in countryside!"
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!"
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!"
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!"
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!"
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle!"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!"
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic!"
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has an camping activities!"
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!"
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!"
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is in the luxurious!"
  },
  
];
const Categories = () => {
  const params =useSearchParams()
 const category = params?.get('category')
 const pathname = usePathname()
 const isMainPage = pathname ==='/'
 if(!isMainPage){
  return null
 }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  )
}

export default Categories
