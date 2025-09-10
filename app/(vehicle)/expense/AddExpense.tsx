import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { ms } from 'react-native-size-matters';
import CustomDropdownApi from '@/components/CustomDropdownApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLazyQuery } from '@apollo/client';
import { GetBreakdownTypeSuggestionsDocument } from '@/graphql/generated';

const BreakDownSchema = z.object({
    breakdownDate: z.string().min(1, "Breakdown Date is required"),
    breakdownDescription: z.string().min(1, "Breakdown Description is required"),
    breakdownLocation: z.string().min(1, "Breakdown Location is required"),
    breakdownType: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Breakdown Type is required" }),
    latitude: z.string()
        .min(1, "Latitude is required")
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        }, { message: "Invalid Latitude" }),

    longitude: z.string()
        .min(1, "Longitude is required")
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        }, { message: "Invalid Longitude" }),
    mediaUrl: z.array(z.object({
        mediaType: z.string(),
        url: z.string(),
    })).optional(),
    vehicleId: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Vehicle is required" }),
});


const defaultValues = {
    breakdownDate: '',
    breakdownDescription: '',
    breakdownLocation: '',
    breakdownType: undefined,
    latitude: '',
    longitude: '',
    mediaUrl: [],
    vehicleId: undefined,
}

const AddExpense = () => {
    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data as string) : null;
    const { theme } = useTheme();
    const [VehiclesBreakdownType, { data: BreakdownTypeData }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);
    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, trigger, clearErrors } = useForm<z.infer<typeof BreakDownSchema>>({
        resolver: zodResolver(BreakDownSchema),
        defaultValues: defaultValues
    });

      useEffect(() => {
        VehiclesBreakdownType();
      }, [ VehiclesBreakdownType]);

    const watchedBreakdownType = watch("breakdownType");
    const BreakDownData = BreakdownTypeData?.getBreakdownTypeSuggestions
    const DropdownBreakType = useMemo(() => BreakDownData?.map((item) => ({
        label: item || "",
        value: item || "",
    })) || [], [BreakDownData]);
    return (
        <CustomHeader
            title={parsedData ? "Update Expense" : "Create Expense"}
            leftComponent={
                <Pressable
                    style={styles.menuButton}
                    onPress={() => {
                        router.navigate({
                            pathname: "/(vehicle)/expense/ExpenseList",
                        })
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
                </Pressable>
            }
        >
            <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View>
                            <CustomDropdownApi
                                options={DropdownBreakType}
                                placeholder="Select Breakdown Type"
                                control={control}
                                name="breakdownType"
                                error={errors.breakdownType as any}
                                label="Breakdown Type"
                                required={true}
                                value={watchedBreakdownType}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </CustomHeader>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(8),
        borderRadius: ms(20),
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    container: {
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: ms(100),
    },
})