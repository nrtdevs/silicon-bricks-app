import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import React, { useCallback,useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  DeleteVehicleDocument,
  EnableVehicleStatusDocument,
  PaginatedVehiclesDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import VehicleCard from "@/components/vehicle/VehicleCart";
import { ms } from "react-native-size-matters";
import { FAB } from "@rneui/themed";
import {
  router,
  useFocusEffect,
  useNavigation,
} from "expo-router";
import NoDataFound from "@/components/NoDataFound";
import StatusModal from "@/components/vehicle/StatusModal";
import CustomValidation from "@/components/CustomValidation";
import { useForm } from "react-hook-form";
import { Entypo, Ionicons } from "@expo/vector-icons";
import CustomSearchBar from "@/components/CustomSearchBar";

import debounce from "lodash.debounce";
import { Colors } from "@/constants/Colors";
import { Env } from "@/constants/ApiEndpoints";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import CustomHeader from "@/components/CustomHeader";
import { DrawerActions } from "@react-navigation/native";

const VehicleList = () => {
  const [getVehicleListApi, { data, loading, error, refetch }] =
    useLazyQuery<any>(PaginatedVehiclesDocument);

  const navigation = useNavigation();
  const { theme } = useTheme();
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

  const [deleteVehicleApi, deleteVehicleStat] = useMutation(
    DeleteVehicleDocument,
    {
      onCompleted: (data) => {
        fetchVehicleList();
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      },
    }
  );

  const [changeVehicleStatusApi, changeVehicleStatusStat] = useMutation(
    EnableVehicleStatusDocument,
    {
      onCompleted: (data) => {
        setIsModalVisible(false);
        fetchVehicleList();
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      },
    }
  );
  const handleStatusUpdate = (id: string) => {
    let params = {
      status: watch("status")?.value,
      id: Number(id),
    };

    changeVehicleStatusApi({
      variables: {
        data: params,
      },
    });
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [vehicleList, setVehicleList] = useState<any>([]);

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
      filter: { name: search },
      search: search,
    };

    let response = await getVehicleListApi({
      variables: {
        listInputDto: params,
      },
      fetchPolicy: "network-only",
    });
    const data = response?.data?.paginatedVehicles;
    const newItems = data?.data || [];
    const lastPage = Math.ceil(data?.meta?.totalItems / Env.LIMIT);
    if (newItems.length > 0) {
      setVehicleList((prev: any) =>
        isRefresh && currentPage == 1 ? newItems : [...prev, ...newItems]
      );
      setPage(currentPage + 1);
      if (isRefresh) setRefreshing(false);
      setIsLoading(false);
      setHasMore(currentPage < lastPage);
    } else {
      if (isRefresh) setVehicleList([]);
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

  const renderItems = (item: any) => {
    return (
      <VehicleCard
        brand={item?.make}
        model={item?.model}
        chassisNumber={item?.chassisNumber}
        number={item?.numberPlate}
        createdAt={item?.createdAt}
        status={item?.status}
        onEdit={() =>
          router.navigate({
            pathname: "/add-edit-vehicle",
            params: { data: JSON.stringify(item) },
          })
        }
        onDelete={() =>
          deleteVehicleApi({
            variables: {
              deleteVehicleId: Number(item?.id),
            },
          })
        }
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

  // console.log('loading',loading);
  // console.log('page',page);
  // console.log('refreshing',refreshing);

  if (
    (loading && page == 1 && !refreshing) ||
    deleteVehicleStat.loading ||
    changeVehicleStatusStat.loading
  )
    return <Loader />;

  return (
    <CustomHeader
      title="Vehicle List"
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
        data={vehicleList}
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
        onSubmit={() => handleStatusUpdate(selectedVehicle?.id)}
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
    </CustomHeader>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  menuButton: {
    padding: ms(10),
  },
});
