import { ThemedView } from "@/components/ThemedView";
import VehicleCard from "@/components/vehicle/VehicleCart";

const ActivityLog = () => {
    return(
        <ThemedView>
           <VehicleCard
                brand="Brand"
                model="model"
                chassisNumber="Ch8542"
                number="Mp 04 UH 5245"
                createdAt=""
                status="active"
                onEdit={() => {}}
                onDelete={() => {}}
                onChangeStatus={() => {}}
                onView={() => {}}
            /> 
        </ThemedView>
    );
}
export default ActivityLog;