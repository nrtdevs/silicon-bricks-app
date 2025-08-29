import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import VehicleCard from "@/components/vehicle/VehicleCart";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { router, useNavigation } from "expo-router";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

const ServiceCenter = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    // <VehicleCard
    //     brand="Brand"
    //     model="model"
    //     chassisNumber="Ch8542"
    //     number="Mp 04 UH 5245"
    //     createdAt=""
    //     status="active"
    //     onEdit={() => { }}
    //     onDelete={() => { }}
    //     onChangeStatus={() => { }}
    //     onView={() => { }}
    // />
    return (
        <CustomHeader
            title="Service Center "
            leftComponent={
                <Pressable
                    style={styles.menuButton}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Entypo name="menu" size={ms(28)} color={Colors[theme].text} />
                </Pressable>
            }
        >
            <ThemedView style={{ flex: 1 }}>
                
                {/* <FlatList 
                data={}
                  keyExtractor={(item) => item?.id?.toString()}
                /> */}
                <FAB
                    size="large"
                    title="Add Service"
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                    }}
                    icon={{
                        name: "add",
                        color: "white",
                    }}
                    onPress={() => router.navigate("/(vehicle)/service/AddService")}
                />
            </ThemedView>
        </CustomHeader>
    );
}
export default ServiceCenter;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
});