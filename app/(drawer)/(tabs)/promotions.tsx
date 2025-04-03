import { ms, ScaledSheet, vs } from 'react-native-size-matters';
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Portal, Dialog } from 'react-native-paper';
import { ThemeProvider } from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const GetAllPromotion = gql`
  query PaginatedOffers($listInputDto: ListInputDTO!) {
  paginatedOffers(ListInputDTO: $listInputDto) {
    data {
      id
      title
      description
      offerType
      discountType
      discountValue
      maxDiscountAmount
      cashbackAmount
      minOrderAmount
      usageLimit
      status
      startDate
      endDate
    } 
  }
}
`;
const DELETE_PROMOTION = gql`
  mutation DeleteOffer($deleteOfferId: Int!) {
  deleteOffer(id: $deleteOfferId)
}
`;
const Promotions = () => {

    /// Delete promotions state --
    const [selectedPromptionId, setSelectedPromotionId] = useState<number | null>(null);
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const hideDeleteDialogue = () => { setDeleteVisible(false) };
    const showDeleteDialogue = (id: number) => {
        setSelectedPromotionId(id);
        setDeleteVisible(true)
    };
    const [deleteProject] = useMutation(DELETE_PROMOTION, {
        onCompleted: () => {
            console.log("Project deleted successfully");
            setDeleteVisible(false);
        },
        onError: (error) => {
            console.error("Error deleting project:", error);
        },
    });
    const handleDelete = async () => {
        if (selectedPromptionId !== null) {
            try {
                await deleteProject({ variables: { deleteProjectId: Number(setSelectedPromotionId) } });
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    /// get All promotions --

    const [getAllPromotion, { data, loading, error }] = useLazyQuery(GetAllPromotion);
    useEffect(() => {
        console.log("Get All Promotions", data);
        getAllPromotion({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, []);
    const promotions = data?.paginatedOffers.data || [];

    return (
        <CustomHeader>
            <ThemedView style={styles.container}>
                <FlatList
                    data={promotions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <LinearGradient
                                colors={["#0a54c9", "#5087de"]}
                                style={styles.card}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Title</ThemedText>
                                    <ThemedText style={styles.cardDot}>:</ThemedText>
                                    <ThemedText style={styles.cardDot}>{item.title}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Offer Type</ThemedText>
                                    <ThemedText style={styles.cardDot}>:</ThemedText>
                                    <ThemedText style={styles.cardDot}>{item.offerType}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Discount</ThemedText>
                                    <ThemedText style={styles.cardDot}>:</ThemedText>
                                    <ThemedText style={styles.cardDot}>{item.discountValue}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Usage Limit</ThemedText>
                                    <ThemedText style={styles.cardDot}>:</ThemedText>
                                    <ThemedText style={styles.cardDot}>{item.usageLimit}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Status</ThemedText>
                                    <ThemedText style={styles.cardDot}>:</ThemedText>
                                    <ThemedText style={styles.cardDot}>{item.status}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ThemedText style={styles.cardTitle}>Action</ThemedText>
                                    <ThemedText style={styles.cardDot}>: </ThemedText>
                                    <Pressable
                                        onPress={() => {
                                            router.push({
                                                pathname: "/editPromotion",
                                                params: { id: 1, title: "poprpro" },
                                            })
                                        }}
                                    >
                                        <Feather name="edit" color="white" size={24} />
                                    </Pressable>
                                    <View style={{ width: 10 }}></View>
                                    <Pressable
                                        onPress={() => showDeleteDialogue(item.id)}
                                    >
                                        <MaterialCommunityIcons
                                            name="delete-empty"
                                            size={26}
                                            color="red"
                                        />
                                    </Pressable>
                                </View>
                            </LinearGradient>
                        </View>
                    )}
                />

                <Pressable
                    style={styles.fab}
                    onPress={() => router.push("/addPromotions")}
                >
                    <Feather name="plus" color="white" size={24}></Feather>
                </Pressable>

                <Portal>
                    <ThemeProvider>
                        <Dialog visible={deleteVisible} onDismiss={hideDeleteDialogue}>
                            <Dialog.Content>
                                <ThemedText style={styles.label}>
                                    Do You Want To Really Delete The Project
                                </ThemedText>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Pressable
                                    onPress={handleDelete}
                                    style={styles.buttonContainerSave}
                                >
                                    <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Yes</ThemedText>
                                </Pressable>
                                <Pressable
                                    onPress={hideDeleteDialogue}
                                    style={styles.buttonContainerClose}
                                >
                                    <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>No</ThemedText>
                                </Pressable>
                            </Dialog.Actions>
                        </Dialog>
                    </ThemeProvider>
                </Portal>
            </ThemedView>
        </CustomHeader>
    );
}
export default Promotions;

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        width: 110,
        color: "white",
        fontWeight: "500",
    },
    cardDot: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: "white",
        fontWeight: "normal",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: "#0a54c9",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonContainerClose: {
        borderRadius: 10,
        paddingVertical: 5,
        marginTop: 10,
        paddingHorizontal: 20,
        borderColor: "black",
        borderWidth: 0.5,
    },
    buttonContainerSave: {
        backgroundColor: "#E06557",
        borderRadius: 10,
        paddingVertical: 5,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        color: "black",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
});