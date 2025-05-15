import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { PaginatedVehiclesDocument } from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { FlatList } from "react-native-gesture-handler";
import VehicleCard from "@/components/vehicle/VehicleCart";
import { ms } from "react-native-size-matters";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";

const vehicleList = () => {
  const [getVehicleListApi, { data, loading, error }] = useLazyQuery<any>(
    PaginatedVehiclesDocument
  );

  useEffect(() => {
    getVehicleListApi({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data?.paginatedVehicles?.data}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }: any) => (
          <VehicleCard
            brand={item?.make}
            model={item?.model}
            chassisNumber={item?.chassisNumber}
            number={item?.numberPlate}
            createdAt={item?.createdAt}
            status={item?.status}
            onEdit={() => console.log("Edit", item.id)}
            onDelete={() => console.log("Delete", item.id)} 
            onChangeStatus={() => console.log("Change Status", item.id)}
            onView={() => console.log("View", item.id)}
          />
        )}
        contentContainerStyle={{ paddingVertical: ms(10) }}
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
        onPress={() => router.navigate('/vehicle/add')}
      />
    </SafeAreaView>
  );
};

export default vehicleList;

const styles = StyleSheet.create({});
