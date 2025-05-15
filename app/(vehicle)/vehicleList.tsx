import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  DeleteVehicleDocument,
  PaginatedVehiclesDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { FlatList } from "react-native-gesture-handler";
import VehicleCard from "@/components/vehicle/VehicleCart";
import { ms } from "react-native-size-matters";
import { FAB } from "@rneui/themed";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import NoDataFound from "@/components/NoDataFound";

const VehicleList = () => {
  const [getVehicleListApi, { data, loading, error, refetch }] =
    useLazyQuery<any>(PaginatedVehiclesDocument);

  const [deleteVehicleApi, deleteVehicleStat] = useMutation(
    DeleteVehicleDocument,
    {
      onCompleted: (data) => { 
        fetchVehicleList()
           },
           onError: (error) => {
             console.log(error);
             Alert.alert("Error", error.message);
           },
    }
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchVehicleList = () => {
    getVehicleListApi({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
      fetchPolicy: "network-only",
    });
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVehicleList();
    }, [])
  );

  if (loading || deleteVehicleStat.loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data?.paginatedVehicles?.data}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoDataFound />}
        renderItem={({ item }: any) => (
          <VehicleCard
            brand={item?.make}
            model={item?.model}
            chassisNumber={item?.chassisNumber}
            number={item?.numberPlate}
            createdAt={item?.createdAt}
            status={item?.status}
            onEdit={() =>
              router.navigate({
                pathname: "/vehicleAdd",
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
            onChangeStatus={() => console.log("Change Status", item.id)}
            onView={() => console.log("View", item.id)}
          />
        )}
        contentContainerStyle={{ paddingVertical: ms(10) }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchVehicleList();
        }}
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
        onPress={() => router.navigate("/vehicleAdd")}
      />
    </SafeAreaView>
  );
};

export default VehicleList;

const styles = StyleSheet.create({});
