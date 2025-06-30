import { ThemedView } from "@/components/ThemedView";
import VehicleCard from "@/components/vehicle/VehicleCart";

const VehicleExpense = () => {
    return (
        <ThemedView style={{ flex: 1 }}>
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
export default VehicleExpense;