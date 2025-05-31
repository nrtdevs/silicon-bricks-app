import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLazyQuery } from "@apollo/client";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import CustomValidation from "@/components/CustomValidation";
import { Dialog, Portal } from "react-native-paper";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { labels } from "@/constants/Labels";
import { ThemedView } from "@/components/ThemedView";
import CustomSearchBar from "@/components/CustomSearchBar";
import { Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import debounce from "lodash.debounce";
import {
  DeleteRoleDocument,
  PaginatedRolesDocument,
} from "@/graphql/generated";
import { useUserContext } from "@/context/RoleContext";
import { router, useFocusEffect } from "expo-router";
import NoDataFound from "@/components/NoDataFound";
import CustomRole from "@/components/master/CustomRole";
import { FAB } from "@rneui/themed";
import { Env } from "@/constants/ApiEndpoints";
import Loader from "@/components/ui/Loader";

const RolesScreen = () => {
  const { theme } = useTheme();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rolesData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedRolesDocument
  );
  const [rolesList, setRolesList] = useState<any[]>([]);
  const fetchRoles = async (isRefreshing = false, searchParams = "") => {
    if (loading && !isRefreshing) return;
    let currentPage = isRefreshing ? 1 : page;

    if (isRefreshing) {
      setRefreshing(true);
      setPage(1);
    }

    const params = {
      limit: Env?.LIMIT as number,
      page: currentPage,
      search: searchParams,
    };

    try {
      const res: any = await rolesData({
        variables: {
          listInputDto: params,
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedRoles) {
        const data: any = res?.data?.paginatedRoles;
        const newItems = data?.data || [];

        setRolesList((prev: any) => {
          return isRefreshing || currentPage == 1
            ? newItems
            : [...prev, ...newItems];
        });
        const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
        if (!isRefreshing && currentPage < lastPage) {
          setPage(currentPage + 1);
        }
        setHasMore(currentPage < lastPage);
        setRefreshing(false);
      } else {
        console.log("API call failed or returned no data:", res?.errors);
        setRefreshing(false);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setRefreshing(false);
      setHasMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRoles(true);
      setSearch(false)
    }, [])
  );

  /// search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  /// delete role state --
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const showDeleteDialogue = (id: number) => {
    setSelectedProjectId(id);
    setDeletePopupVisible(true);
  };
  const hideDeleteDialogue = () => {
    setDeletePopupVisible(false);
    setSelectedProjectId(null);
  };

  const [deleteRole, deleteRoleState] = useMutation(DeleteRoleDocument, {
    onCompleted: (data) => {
      fetchRoles(true);
      refetch();
      //   setEditVisible(false);
      //   setCurrentProject(defaultValue)
      //   setModalVisible(false);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Module:Delete");
  const checkUpdatePermission = can("MasterApp:Module:Update");
  const createPermission = can("MasterApp:Module:Create");
  const statusUpdatePermission = can("MasterApp:Module:Action");

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const renderItem = ({ item, index }: any) => {
    return (
      <CustomRole
        name={item?.name ?? ""}
        permissions={item?.permissionCount?.toString() ?? ""}
        description={item?.description ?? ""}
        onEdit={() => {
          router.push({
            pathname: "/(subComponents)/createRole",
            params: {
              editable: "true",
              id: item.id,
              name: item.name,
            },
          });
        }}
        onDelete={() =>
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Yes",
              onPress: () => {
                deleteRole({
                  variables: {
                    ids: Number(item?.id),
                  },
                  fetchPolicy: "network-only",
                });
              },
            },
            { text: "No", onPress: () => {} },
          ])
        }
        editPermission={checkUpdatePermission}
        deletePermission={deletePermission}
      />
    );
  };

  const debouncedSearch = useCallback(
    debounce(async (text) => {
      const res = await rolesData({
        variables: {
          listInputDto: {
            limit: 10,
            page: 1,
            search: text,
          },
        },
      });
      setRolesList(res?.data?.paginatedRoles?.data ?? []);
    }, 500),
    [searchQuery]
  );

  if ((loading && page == 1 && !refreshing) || deleteRoleState?.loading) {
    return <Loader />;
  }

  return (
    <CustomHeader
      leftComponent={
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={{ padding: ms(10) }}
        >
          <FontAwesome5
            name="arrow-left"
            size={22}
            color={Colors[theme].text}
          />
        </Pressable>
      }
      title="Role"
      rightComponent={
        <Pressable
          onPress={() => {
            setSearch((prev) => !prev);
          }}
          style={{ padding: ms(10) }}
        >
          <FontAwesome5 name="search" size={22} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          {search && (
            <View style={{ flex: 1 }}>
              <CustomSearchBar
                searchQuery={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  debouncedSearch(text);
                }}
                placeholder={labels?.searchRole}
                // loading={loading}
                onClear={() => {
                  setSearchQuery("");
                }}
              />
            </View>
          )}
        </View>

        <FlatList
          data={rolesList}
          renderItem={({ item, index }: any) => renderItem({ item, index })}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing && !loading}
          onRefresh={() => {
            fetchRoles(true);
          }}
          keyExtractor={(item: any, index: number) => index.toString()}
          contentContainerStyle={{ paddingBottom: vs(100) }}
          ListEmptyComponent={!loading ? <NoDataFound /> : null}
          ListFooterComponent={
            hasMore ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : null
          }
          onEndReached={() => {
            if (hasMore && !loading) {
              fetchRoles();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </ThemedView>

      {createPermission && (
        <FAB
          size="large"
          title="Add Role"
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 30,
          }}
          icon={{
            name: "add",
            color: "white",
          }}
          onPress={() => router.push("/(subComponents)/createRole")}
        />
      )}
    </CustomHeader>
  );
};

export default RolesScreen;

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 10,
  },
  buttonContainer: { marginLeft: "12@ms" },
  searchContainer: {
    marginBottom: "16@ms",
    marginHorizontal: "12@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  organizationParentContainer: {},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  organizationContainer: {
    width: "100%",
    padding: "12@ms",
    borderRadius: "8@ms",
    marginBottom: "16@ms",
    gap: "8@ms",
  },
  organizationInfo: {
    flexDirection: "row",
    gap: "5@ms",
  },
  loadingText: {
    fontSize: 18,
    color: "#007BFF",
  },
  permission: {
    color: "green",
    borderRadius: "10@ms",
    width: "110@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  deleteButton: {
    backgroundColor: "#ee0b0b",
    padding: 6,
    borderRadius: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dadada",
    padding: 10,
    margin: 8,
    borderRadius: 12,
    height: 80,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
    marginHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {},
  cardDot: {
    fontSize: 16,
    color: "black",
    fontWeight: "normal",
  },
  label: {
    fontSize: "16@ms",
    fontWeight: "normal",
    color: "black",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
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
  dialogueTitle: {
    fontSize: "14@ms",
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
});
