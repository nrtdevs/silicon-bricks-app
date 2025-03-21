import { GetAllOrganisations } from "@/graphql/Query";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

interface OrganizationData {
  id: string;
  name: string;
  description: string;
  status: string;
}

const Organization = () => {
  const [getOrganizations, { data, loading, error }] =
    useLazyQuery(GetAllOrganisations);

  console.log(data?.paginatedOrganization?.data, "data orgination");

  useEffect(() => {
    getOrganizations({
      variables: {
        listInputDto: {
          page: 1,
          limit: 10,
        },
      },
    });
  }, [getOrganizations]);

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error fetching organizations: {error.message}</Text>;

  const datax = data?.paginatedOrganization?.data;

  return (
    <View style={styles.container}>
      <FlatList
        data={datax}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>

                <Text style={styles.title}>{item.status}</Text>
              </View>
            </>
          );
        }}
        keyExtractor={(item: OrganizationData) => item.id}
      />
    </View>
  );
};

export default Organization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
});
