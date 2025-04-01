import { ms, ScaledSheet } from 'react-native-size-matters';
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Portal, Dialog } from 'react-native-paper';
import { ThemeProvider } from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react'
import CustomValidation from '@/components/CustomValidation';
import { useForm } from 'react-hook-form';
import { labels } from '@/constants/Labels';


interface AddPromotionData {
    email: string;
    password: string;
    confirmPassword: string;
}

const Promotions = () => {
    /// Add promotion state --
    const [visible, setVisible] = React.useState(false);
    const hideAddDialogue = () => { setVisible(false) };
    const showAddDilogue = () => setVisible(true);
    const { control, handleSubmit, formState: {}} = useForm<AddPromotionData>({ mode: "onBlur" });

    /// Delete promotions state --
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const hideDeleteDialogue = () => { setDeleteVisible(false) };
    const showDeleteDialogue = () => setDeleteVisible(true);

    /// Edit promotions state --
    const [editVisible, setEditVisible] = React.useState(false);
    const hideEditDialogue = () => { setEditVisible(false) };
    const showEditDialogue = () => setEditVisible(true);

    return (
        <CustomHeader>
            <ThemedView style={styles.container}>
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
                            <ThemedText style={styles.cardDot}>title  of poprpro</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={styles.cardTitle}>Offer Type</ThemedText>
                            <ThemedText style={styles.cardDot}>:</ThemedText>
                            <ThemedText style={styles.cardDot}>poprpro</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={styles.cardTitle}>Discount</ThemedText>
                            <ThemedText style={styles.cardDot}>:</ThemedText>
                            <ThemedText style={styles.cardDot}>poprpro</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={styles.cardTitle}>Usage Limit</ThemedText>
                            <ThemedText style={styles.cardDot}>:</ThemedText>
                            <ThemedText style={styles.cardDot}>poprpro</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={styles.cardTitle}>Status</ThemedText>
                            <ThemedText style={styles.cardDot}>:</ThemedText>
                            <ThemedText style={styles.cardDot}>poprpro</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={styles.cardTitle}>Action</ThemedText>
                            <ThemedText style={styles.cardDot}>: </ThemedText>
                            <Pressable
                                onPress={() => showEditDialogue()}
                            >
                                <Feather name="edit" color="white" size={24} />
                            </Pressable>
                            <View style={{ width: 10 }}></View>
                            <Pressable
                                onPress={() => showDeleteDialogue()}
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

                <Pressable style={styles.fab} onPress={showAddDilogue}>
                    <Feather name="plus" color="white" size={24}></Feather>
                </Pressable>

                <Portal>
                    <ThemeProvider>
                        <Dialog visible={visible} onDismiss={hideAddDialogue}>
                            <Dialog.Content>
                                <CustomValidation
                                    control={control}
                                    name='title'
                                    type='input'
                                    placeholder={`Enter title`}
                                    label={`Title`}
                                >
                                </CustomValidation>
                                <CustomValidation
                                    control={control}
                                    name='max_discount_amount'
                                    type='input'
                                    placeholder={`Enter max discount amount`}
                                    label={`Max Discount Amount`}
                                >
                                </CustomValidation>
                                <CustomValidation
                                    control={control}
                                    name='discount_value'
                                    type='input'
                                    placeholder={`Enter discount value`}
                                    label={`Discount Value`}
                                >
                                </CustomValidation>
                                <CustomValidation
                                    control={control}
                                    name='cashback_amount'
                                    type='input'
                                    placeholder={`Enter cashback amount`}
                                    label={`Cashback Amount`}
                                >
                                </CustomValidation>
                                <CustomValidation
                                    control={control}
                                    name='min_order_amount'
                                    type='input'
                                    placeholder={`Enter min order amount`}
                                    label={`Min Order Amount`}
                                >
                                </CustomValidation>
                                <CustomValidation
                                    control={control}
                                    name='usage_limit'
                                    type='input'
                                    placeholder={`Enter usage limit`}
                                    label={`Usage Limit`}
                                >
                                </CustomValidation>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Pressable
                                    //   onPress={handleSubmit(onSubmit)}
                                    style={styles.buttonContainerSave}
                                //   disabled={loadingCreate}
                                >
                                    <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Save</ThemedText>

                                </Pressable>
                                <Pressable
                                    onPress={hideAddDialogue}
                                    style={styles.buttonContainerClose}
                                >
                                    <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>Close</ThemedText>
                                </Pressable>
                            </Dialog.Actions>
                        </Dialog>
                    </ThemeProvider>
                </Portal>

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
                                    //   onPress={handleDelete}
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

                <Portal>
                    <ThemeProvider>
                        <Dialog visible={editVisible} onDismiss={hideEditDialogue}>
                            <Dialog.Content>
                                <CustomValidation
                                    control={control}
                                    name='title'
                                    type='input'
                                    placeholder={`Enter title`}
                                    label={`Title`}
                                >
                                </CustomValidation>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Pressable
                                    //   onPress={handleSubmit(onSubmit)}
                                    style={styles.buttonContainerSave}
                                >
                                    <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Save</ThemedText>

                                </Pressable>
                                <Pressable
                                    onPress={hideEditDialogue}
                                    style={styles.buttonContainerClose}
                                >
                                    <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>Close</ThemedText>
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
        flex: 1,
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