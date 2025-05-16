import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useLazyQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { Feather, MaterialIcons, } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { gql, useMutation } from "@apollo/client";
import CustomHeader from '@/components/CustomHeader'
import { ThemedText } from '@/components/ThemedText'
import CustomValidation from '@/components/CustomValidation';
import { Dialog, Portal, } from "react-native-paper";
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { z } from "zod";
import { ms, ScaledSheet, vs } from 'react-native-size-matters';
import { labels } from '@/constants/Labels';
import { ThemedView } from '@/components/ThemedView';
import CustomSearchBar from '@/components/CustomSearchBar';
import { Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import debounce from "lodash.debounce";
import { DeleteRoleDocument, PaginatedRolesDocument } from '@/graphql/generated';
import { useUserContext } from '@/context/RoleContext';
import { router } from 'expo-router';
import NoDataFound from '@/components/NoDataFound';

const RolesScreen = () => {
  const { theme } = useTheme();
  /// fetch Roles data
  const [page, setPage] = useState<number>(1);
  const [rolesData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedRolesDocument
  );
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [rolesList, setRolesList] = useState<any[]>([]);
  const fetchRoles = async (isRefreshing = false, searchParams = "") => {
    // if (isRefreshing) {
    //   setPage(1);
    //   setRefreshing(true);
    // }
    // const params = {
    //   per_page_record: 10,
    //   page: isRefreshing ? 1 : page,
    // };

    // await rolesData({
    //   variables: {
    //     listInputDto: {},
    //   },
    //   fetchPolicy: "network-only",
    // });
    // if (isRefreshing) {
    //   setPage(1);
    //   setRefreshing(true);
    // }

    const currentPage = isRefreshing ? 1 : page;

    const params = {
      limit: 8,
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

      // console.log("Roles Data:00", res?.data?.paginatedRoles?.data);

      if (res?.data?.paginatedRoles?.data) {
        const data: any = res?.data?.paginatedRoles?.data;
        const newItems = data || [];

        setRolesList((prev: any) => {
          if (isRefreshing) {
            return newItems;
          } else {
            // Avoid duplicates by comparing item IDs
            const existingIds = new Set(prev.map((item: any) => item.id));
            const filteredNewItems = newItems.filter(
              (item: any) => !existingIds.has(item.id)
            );
            return [...prev, ...filteredNewItems];
          }
        });

        setRefreshing(false);

        // Update page number only if we received new items
        // if (!isRefreshing) {
        setPage(currentPage + 1);
        // }
        const lastPage = Math.ceil(res?.data?.paginatedRoles?.meta?.totalItems / 8);
        setHasMore(res?.data?.paginatedRoles?.meta?.currentPage < lastPage);
        console.log('currentPage', currentPage);
        console.log('lastPage', res?.data?.paginatedRoles?.meta);
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

  useEffect(() => {
    fetchRoles();
  }, []);

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
  const [deleteRole,] = useMutation(DeleteRoleDocument, {
    onCompleted: (data) => {
      fetchRoles(true);
      refetch();
      //   setEditVisible(false);
      //   setCurrentProject(defaultValue)
      //   setModalVisible(false);
    },
    onError: (error) => {
    }
  });


  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Module:Delete");
  const checkUpdatePermission = can("MasterApp:Module:Update");
  const createPermission = can("MasterApp:Module:Create");
  const statusUpdatePermission = can("MasterApp:Module:Action");

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const hideDialogue = () => {
    setVisible(false);
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
  // console.log('00', rolesList);

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
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
          <Pressable
            style={styles.buttonContainer}
            // onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
            onPress={() => {
              router.push({
                pathname: "/(subComponents)/createRole",
                params: {
                  editable: "false",
                }
              })
            }}          >
            <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
          </Pressable>
        </View>

        <FlatList
          data={rolesList}
          renderItem={({ item, index }: any) => {
            return <View
              key={index}
              style={[
                styles.organizationContainer,
                { backgroundColor: Colors[theme].cart },
              ]}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <ThemedText type='subtitle' style={styles.name}>{item.name}</ThemedText>
                <View style={styles.organizationInfo}>
                  <Feather
                    name="edit"
                    size={ms(22)}
                    color={Colors[theme].text}
                    onPress={() => {
                      router.push({
                        pathname: "/(subComponents)/createRole",
                        params: {
                          editable: "true",
                          id: item.id,
                          name: item.name,
                        }
                      })
                    }}
                  />
                  <View style={{ width: 5 }}></View>
                  <MaterialIcons
                    name="delete-outline"
                    size={ms(22)}
                    color={Colors[theme].text}
                    onPress={() => {
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete?",
                        [
                          {
                            text: "Yes", onPress: () => {
                              deleteRole({
                                variables: {
                                  ids: Number(item?.id),
                                },
                                fetchPolicy: "network-only",
                              });
                            }
                          },
                          { text: "No", onPress: () => { } },
                        ]
                      );

                    }}
                  />
                </View>

              </View>
              <ThemedText
                style={[
                  styles.permission,
                  {
                    // color:
                    // item.status == "active" ? Colors?.green : "#6d6d1b",
                    backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
                  },
                ]}
              >
                {item?.permissionCount} Permissions
              </ThemedText>
              {item?.description && <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                {item?.description}
              </ThemedText>}
            </View>
          }
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                fetchRoles(true);
              }}
            />
          }
          keyExtractor={(item: any, index: number) => index.toString()}
          contentContainerStyle={{ paddingBottom: vs(20), paddingTop: vs(15) }}
          ListEmptyComponent={!loading ? <NoDataFound /> : null}
          ListFooterComponent={
            hasMore ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : null
          }
          onEndReached={() => {
            if (hasMore) {
              fetchRoles();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </ThemedView>
    </CustomHeader >
  )
}

export default RolesScreen

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    padding: "12@ms",
  },
  innerContainer: {
    paddingVertical: 10
  },
  buttonContainer: { marginLeft: "12@ms" },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  organizationParentContainer: {
    marginTop: "12@ms",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: '#007BFF'
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  deleteButton: {
    backgroundColor: '#ee0b0b',
    padding: 6,
    borderRadius: 20
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dadada',
    padding: 10,
    margin: 8,
    borderRadius: 12,
    height: 80,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    elevation: 5,
    marginHorizontal: 20
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {

  },
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
    alignSelf: "center"
  },
})