import RestaurantMenu from "@/components/RestaurantMenu";
import { useParams } from "react-router-dom"


export default function RestaurantMenuPage(){
  const {id} = useParams();

  return (
    <div>
      <RestaurantMenu restaurantId={id as string}/>
    </div>
  )
  
}