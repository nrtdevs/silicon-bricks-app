import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedVehiclesDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

const ServiceCenter = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [getVehicleListApi, data] = useLazyQuery(PaginatedVehiclesDocument);

    useEffect(() => {
        getVehicleListApi({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1
                }
            }
        }
        );
    }, []);

    const vehicles = data?.data?.paginatedVehicles?.data ?? []

    console.log("service list", vehicles)

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
                    data={ }
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