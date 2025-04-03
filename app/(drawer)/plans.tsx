import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { View, Pressable, FlatList, RefreshControl } from "react-native";
import { ScaledSheet, ms, s, vs } from "react-native-size-matters";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import Modal from "react-native-modal";
import { labels } from "@/constants/Labels";
import CustomValidation from "@/components/CustomValidation";
import { useForm } from "react-hook-form";

const GetAllPlansQuery = gql`
  query PaginatedPlans($listInputDto: ListInputDTO!) {
  paginatedPlans(ListInputDTO: $listInputDto) {
    data {
      id
      name
      description
      price
      duration
      discountedPrice
      status
      couponId
      offerId
    }
  }
}
`;
const pickerData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Expired", value: "expired" },
];

const defaultValue = {
    name: "",
    description: "",
    id: "",
}
const Plans = () => {
    /// Fetch All Plans -- Api
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [plansData, { error, data, loading, refetch }] = useLazyQuery(
        GetAllPlansQuery
    );

    // Fetch Plans
    const fetchPlans = async (isRefreshing = false) => {
        if (isRefreshing) {
            setPage(1);
            setRefreshing(true);
        }
        // Params for API
        const params = {
            per_page_record: 10,
            page: isRefreshing ? 1 : page,
        };

        await plansData({
            variables: {
                listInputDto: {},
            },
        });;
    };
    useEffect(() => {
        fetchPlans();
    }, []);

    /// status change state 
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<{ name: string, description: string, status: any }>({
        defaultValues: {},
    });
    const [currentOrganization, setCurrentOrganization] = useState<{
        name: string;
        description: string;
        id: string;
    }>(defaultValue);
    return (
        <CustomHeader>
            <ThemedText
                style={{ fontSize: 22, fontWeight: "700", justifyContent: "center", alignSelf: "center", marginVertical: 10 }}
            >Plans</ThemedText>
            <ThemedView style={styles.container}>
                <FlatList
                    data={data?.paginatedPlans?.data}
                    renderItem={({ item }: any) =>
                    (
                        <View style={styles.cardStyle}>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Name</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={styles.cardDot}>{item.name}</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Price</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={styles.cardDot}>100</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Discount</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={styles.cardDot}>10</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Status</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={{ color: "green", fontSize: 18, fontWeight: "normal", paddingHorizontal: 10 }}>Active</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Action</ThemedText>
                                <ThemedText style={styles.cardDot}>: </ThemedText>
                                <Feather
                                    name="edit"
                                    size={ms(22)}
                                    color="blue"
                                />
                                <View style={{ width: 5 }}></View>
                                <MaterialIcons
                                    name="delete-outline"
                                    size={ms(24)}
                                    color="red"
                                />
                                <View style={{ width: 5 }}></View>
                                <MaterialIcons
                                    name="attractions"
                                    size={ms(22)}
                                    color="black"
                                    onPress={() => {
                                        setCurrentOrganization({
                                            name: item?.name,
                                            description: item?.description,
                                            id: item?.id,
                                        });
                                        setStatusModalVisible(true);
                                    }}
                                />
                            </View>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => fetchPlans(true)}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: vs(40) }}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                />
            </ThemedView>
            <Pressable style={styles.fab}
            //   onPress={showDialogue}
            >
                <Feather name="plus" color="black" size={24}></Feather>
            </Pressable>

            {/* Status change modal */}
            <Modal
                isVisible={isStatusModalVisible}
                onBackdropPress={() => {
                    setStatusModalVisible(false);
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        height: 200,
                        width: s(300),
                        borderRadius: 10,
                        alignSelf: "center",
                        padding: 10,
                    }}
                >
                    <CustomValidation
                        data={pickerData}
                        type="picker"
                        hideStar
                        control={control}
                        name="status"
                        placeholder="Select Status"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select status",
                            },
                        }}
                    />
                </View>
            </Modal>
        </CustomHeader>
    );
};
const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: "#C9C9C9",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    cardStyle: {
        backgroundColor: "#C9C9C9",
        borderRadius: "8@ms",
        padding: "10@ms",
        marginHorizontal: "10@ms",
        marginVertical: "5@ms"
    },
    cardTitle: {
        fontSize: "18@ms",
        width: 110,
        color: "black",
        fontWeight: "700",
    },
    cardDot: {
        fontSize: "18@ms",
        paddingHorizontal: "10@ms",
        color: "black",
        fontWeight: "normal",
    },
});
export default Plans;