import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { PaginatedBreakdownsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Env } from "@/constants/ApiEndpoints";
import { ms } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import VehicleCard from "@/components/vehicle/VehicleCart";
import StatusModal from "@/components/vehicle/StatusModal";
import CustomValidation from "@/components/CustomValidation";
import { FAB } from "@rneui/themed";
import NoDataFound from "@/components/NoDataFound";
import CustomSearchBar from "@/components/CustomSearchBar";
import { ThemedView } from "@/components/ThemedView";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import Loader from "@/components/ui/Loader";
import VehicleBreakdownCart from "@/components/VehicleBreakdownCart";

const VehicleBreakDownList = () => {
  const statusArr = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
    {
      label: "Breakdown",
      value: "breakdown",
    },
    {
      label: "Maintenance",
      value: "maintenance",
    },
  ];
 
  const [getVehicleBreakdownListApi, { data, loading, error, refetch }] =
    useLazyQuery<any>(PaginatedBreakdownsDocument);

  const navigation = useNavigation();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [vehicleBreakdownList, setVehicleBreakdownList] = useState<any>([]);
 
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{ status: any }>({
    defaultValues: {
      status: "",
    },
  });
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchVehicleList = async (isRefresh = false, search = "") => {
    const currentPage = isRefresh ? 1 : page;

    if (isRefresh) {
      setRefreshing(true);
      setPage(1);
    }
    setIsLoading(true);
    const params = {
      limit: Env.LIMIT,
      page: currentPage,
    //   filter: { name: search },
    //   search: search,
    };

    let response = await getVehicleBreakdownListApi({
      variables: {
        listInputDto: params,
      },
      fetchPolicy: "network-only",
    }); 
    const data = response?.data?.paginatedBreakdowns;
    const newItems = data?.data || [];
    const lastPage = Math.ceil(data?.meta?.totalItems / Env.LIMIT);
    if (newItems.length > 0) {
      setVehicleBreakdownList((prev: any) =>
        isRefresh && currentPage == 1 ? newItems : [...prev, ...newItems]
      );
      setPage(currentPage + 1);
      if (isRefresh) setRefreshing(false);
      setIsLoading(false);
      setHasMore(currentPage < lastPage);
    } else {
      if (isRefresh) setVehicleBreakdownList([]);
      setHasMore(false);
    }
    setRefreshing(false);
  };

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchVehicleList();
      navigation.setOptions({
        headerTitle: "Vehicle Breakdown List",
        headerRight: () => (
          <Pressable
            onPress={() => {
              setIsSearch((prev) => !prev);
            }}
          >
            <Ionicons name="search" size={ms(24)} color={Colors[theme].text} />
          </Pressable>
        ),
      });
    }, [])
  );
  const debounceSearch = useCallback(
    debounce((text: string) => {
      fetchVehicleList(false, text);
    }, 1000),
    [searchValue]
  );

  if (loading && page == 1 && !refreshing) return <Loader />;

  const renderItems = (item: any) => {
    return (
      <VehicleBreakdownCart
        title={item?.vehicle?.model}
        subtitle={item?.breakdownType}
        breakDownDate={item?.breakdownDate}
        createdAt={item?.createdAt}
        status={item?.status}
        onEdit={() =>
          router.navigate({
            pathname: "/add-edit-vehicle",
            params: { data: JSON.stringify(item) },
          })
        }
        onDelete={() => {}}
        onChangeStatus={() => {
          let find = statusArr?.find((i: any) => i.value === item?.status);
          setValue("status", find);
          setSelectedVehicle(item);
          setIsModalVisible(true);
        }}
        onView={() =>
          router.navigate({
            pathname: "/vehicle-details",
            
            params: { data: JSON.stringify(item) },
          })
        }
      />
    );
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {isSearch && (
        <CustomSearchBar
          searchQuery={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            debounceSearch(text);
          }}
          placeholder={"Search..."}
          loading={loading && searchValue.length > 0}
          setSearchQuery={setSearchValue}
          containerStyle={{ margin: ms(10), marginBottom: ms(0) }}
        />
      )}
      <FlatList
        data={vehicleBreakdownList}
        keyExtractor={(item, index) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading ? (
            <NoDataFound onPress={() => fetchVehicleList(true)} />
          ) : null
        }
        renderItem={({ item }: any) => renderItems(item)}
        contentContainerStyle={{ paddingVertical: ms(10) }}
        ListFooterComponent={
          hasMore ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : null
        }
        onEndReached={() => {
          if (hasMore && !isLoading) {
            fetchVehicleList(false, searchValue);
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing && !isLoading}
            onRefresh={() => fetchVehicleList(true)}
          />
        }
        onEndReachedThreshold={0.5}
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews={true}
      />
      <FAB
        size="large"
        title="Add Vehicle"
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
        onPress={() => router.navigate("/add-edit-vehicle")}
      />

      <StatusModal
        title="Change Vehicle Status"
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={() => {}}
        dropdown={
          <CustomValidation
            type="picker"
            control={control}
            name={"status"}
            label={"Status"}
            data={statusArr}
          />
        }
      />
    </ThemedView>
  );
};

export default VehicleBreakDownList;

const styles = StyleSheet.create({});
