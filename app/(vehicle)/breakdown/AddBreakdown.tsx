import CustomDropdownApi from "@/components/CustomDropdownApi";
import CustomHeader from "@/components/CustomHeader";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedServiceCentersDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import StepIndicator from "react-native-step-indicator";
import { z } from 'zod'
const labels = ["Details", "Location", "Media"];

const BreakDownSchema = z.object({
  name: z.string().min(1, "Center Name is required"),
  contactNo: z.string().min(1, "Contact Number is required").regex(/^(\+91)?[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  latitude: z.string().min(1, "Latitude is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= -90 && num <= 90;
  }, { message: "Invalid Latitude" }),
  longitude: z.string().min(1, "Longitude is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= -180 && num <= 180;
  }, { message: "Invalid Longitude" }),
  address: z.string().min(1, "Address is required"),
});


const defaultValues = {
  name: "",
  contactNo: "",
  latitude: "",
  longitude: "",
  address: ""
}

const AddBreakdown = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const { theme } = useTheme();
  const { data } = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const parsedData = data ? JSON.parse(data as string) : null;
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [getVehicleListApi, { data: DropdownData, loading, error }] = useLazyQuery(PaginatedServiceCentersDocument);
  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<z.infer<typeof BreakDownSchema>>({
    resolver: zodResolver(BreakDownSchema),
    defaultValues: defaultValues
  });

  // Fetch data function
  const fetchData = useCallback(() => {
    if (hasMore) {
      getVehicleListApi({
        variables: {
          listInputDto: {
            limit: limit,
            page: currentPage
          }
        }
      });
    }
  }, [currentPage, hasMore, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const Maindata = DropdownData?.paginatedServiceCenters.data || []

  console.log("Maindata", Maindata)

  const dropdownOptions = [
    { label: 'React Native', value: 'rn' },
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
  ];

  const handleSelect = (item) => {
    console.log('Selected:', item);
  };

  return (
    <CustomHeader
      title={parsedData?.id ? "Update Service" : "Create Service"}
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            router.navigate({
              pathname: "/(vehicle)/breakdown/BreakdownList",
            })
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <View style={styles.container}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
          onPress={setCurrentPosition}
        />
        <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}>
          <ScrollView>
            <View style={styles.content}>
              {currentPosition === 0 &&
                <>
                <CustomDropdownApi
                  options={dropdownOptions}
                  onSelect={handleSelect}
                  placeholder="Select a language"
                />
                </>}
            </View>
          </ScrollView>
        </SafeAreaView>


      </View>
    </CustomHeader>
  );
}

export default AddBreakdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  menuButton: {
    padding: ms(10),
  },
  content: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});

const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#3B82F6",
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: "#3B82F6",
  stepStrokeUnFinishedColor: "#D1D5DB",
  separatorFinishedColor: "#3B82F6",
  separatorUnFinishedColor: "#D1D5DB",
  stepIndicatorFinishedColor: "#3B82F6",
  stepIndicatorUnFinishedColor: "#F3F4F6",
  stepIndicatorCurrentColor: "#FFFFFF",
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#3B82F6",
  stepIndicatorLabelFinishedColor: "#FFFFFF",
  stepIndicatorLabelUnFinishedColor: "#9CA3AF",
  labelColor: "#9CA3AF",
  labelSize: 13,
  currentStepLabelColor: "#3B82F6",
};