import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateOrganizationDocument,
  DeleteOrganizationDocument,
  EnableOrganizationStatusDocument,
  PaginatedOrganizationDocument,
  UpdateOrganizationDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/ui/Loader";
import NoDataFound from "@/components/NoDataFound";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";
import { router } from "expo-router";
import CustomCard from "@/components/master/CustomCard";
import Card from "@/components/master/Card";
import { Env } from "@/constants/ApiEndpoints";
import { FAB } from "@rneui/themed";

const defaultValue = {
  name: "",
  description: "",
  id: "",
};

const pickerData = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
  { label: "Pending", value: "pending" },
];

const OrganizationScreen = () => {
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{ name: string; description: string; status: any }>({
    defaultValues: {},
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [organizationList, setOrganizationList] = useState<any>([]);
  const [organizationData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedOrganizationDocument
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<{
    name: string;
    description: string;
    id: string;
  }>(defaultValue);
  const [createOrganization, createOrganizationState] = useMutation(
    CreateOrganizationDocument,
    {
      onCompleted: (data) => {
        reset();
        fetchOrganization(true);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Organization:Delete");
  const updatePermission = can("MasterApp:Organization:Update");
  const createPermission = can("MasterApp:Organization:Create");
  const statusUpdatePermission = can("MasterApp:Organization:Action");

  //   const ckeckall = hasAny(['MasterApp:Organization:Create', 'MasterApp:Organization:Update', 'MasterApp:Organization:Delete'])
  //  console.log('9999',ckeckall);

  const [updateOrganization, updateOrganizationState] = useMutation(
    UpdateOrganizationDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setCurrentOrganization(defaultValue);
        setEditModal(false);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [deleteOrganization, deleteOrganizationState] = useMutation(
    DeleteOrganizationDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setCurrentOrganization(defaultValue);
        setEditModal(false);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [updateOrganizationStatus, updateOrganizationStatusState] = useMutation(
    EnableOrganizationStatusDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setStatusModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  // const setCurrentOrganizationData() => {
  //   setValue("name", currentOrganization?.name)
  //   setValue("description", currentOrganization?.description)
  // }

  useEffect(() => {
    setValue("name", currentOrganization?.name);
    setValue("description", currentOrganization?.description);
  }, [currentOrganization]);

  useEffect(() => {
    setCurrentOrganization(defaultValue);
    fetchOrganization();
  }, []);

  const onSubmit = (data: any) => {
    try {
      let params = {
        name: data?.name,
        description: data?.description ?? "",
      };

      editModal
        ? updateOrganization({
            variables: {
              updateOrganizationInput: {
                id: Number(currentOrganization?.id),
                ...params,
              },
            },
          })
        : createOrganization({
            variables: {
              createOrganizationInput: {
                ...params,
              },
            },
          });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <CustomCard
        name={item?.name}
        status={item?.status}
        description={item?.description}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        onEdit={() => {
          setCurrentOrganization({
            name: item?.name,
            description: item?.description,
            id: item?.id,
          });
          // setCurrentOrganizationData();
          setModalVisible(true);
          setEditModal(true);
        }}
        onDelete={() =>
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Yes",
              onPress: () => {
                deleteOrganization({
                  variables: {
                    ids: [Number(item?.id)],
                  },
                });
              },
            },
            { text: "No", onPress: () => {} },
          ])
        }
        onChangeStatus={() => {
          setCurrentOrganization({
            name: item?.name,
            description: item?.description,
            id: item?.id,
          });
          setValue("status", item?.status);
          setStatusModalVisible(true);
        }}
      />
    );
  };
  // console.log('page',data?.paginatedOrganization?.meta?.totalItems);

  const fetchOrganization = async (isRefreshing = false, searchParams = "") => {
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
      const res: any = await organizationData({
        variables: {
          listInputDto: params,
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedOrganization) {
        const data: any = res?.data?.paginatedOrganization;
        const newItems = data?.data || [];

        setOrganizationList((prev: any) => {
          return isRefreshing && currentPage == 1
            ? newItems
            : [...prev, ...newItems];
        });
        const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
        setPage(currentPage + 1);
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

  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchOrganization(true, text);
    }, 500),
    [searchQuery]
  );

  if (
    (loading && page == 1 && !refreshing) ||
    deleteOrganizationState.loading ||
    updateOrganizationStatusState?.loading
  ) {
    return <Loader />;
  }

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
              placeholder={labels?.searchOrganization}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={organizationList}
            renderItem={({ item, index }: any) => renderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && !loading}
            onRefresh={() => {
              fetchOrganization(true);
            }}
            keyExtractor={(item: any, index: number) => index.toString()}
            contentContainerStyle={{ paddingBottom: vs(120) }}
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            ListFooterComponent={
              hasMore ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : null
            }
            onEndReached={() => {
              if (hasMore && !loading) {
                fetchOrganization();
              }
            }}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ThemedView>

      {createPermission && (
        <FAB
          size="large"
          title="Add Organization"
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
          onPress={() => {
            setModalVisible(true), setCurrentOrganization(defaultValue);
          }}
        />
      )}

      {/* create and edit modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          reset();
          setCurrentOrganization(defaultValue);
          setEditModal(false);
          setModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cart,
            height: vs(350),
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <ThemedText type="subtitle">
              {editModal ? "Edit" : labels?.createOraganization}
            </ThemedText>
            <Pressable
              onPress={() => {
                reset();
                setEditModal(false);
                setCurrentOrganization(defaultValue);
                setModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>

          <View style={{ padding: 10 }}>
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name={"name"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              onFocus={() => setIsFocused("name")}
              rules={{
                required: editModal
                  ? "Text organization is required"
                  : "Module name is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name={"description"}
              label={"Description"}
              labelStyle={[styles.label, { color: Colors[theme].text }]}
              onFocus={() => setIsFocused("description")}
              autoCapitalize="none"
            />
          </View>

          <CustomButton
            title="Submit"
            isLoading={
              editModal
                ? updateOrganizationState.loading
                : createOrganizationState.loading
            }
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            style={{
              backgroundColor: Colors[theme].background,
              marginTop: vs(10),
            }}
          />
        </View>
      </Modal>

      {/* status modal */}
      <Modal
        isVisible={isStatusModalVisible}
        onBackdropPress={() => {
          setStatusModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cart,
            height: vs(330),
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <ThemedText type="subtitle">{"Change Status"}</ThemedText>
            <Pressable
              onPress={() => {
                setStatusModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>
          <CustomValidation
            data={pickerData}
            type="picker"
            hideStar
            control={control}
            name="status"
            placeholder="Select Status"
            inputStyle={{ height: vs(50), marginTop: 0, paddingTop: 0 }}
            inputContainerStyle={{ marginTop: 0, paddingTop: 0 }}
            containerStyle={{ marginTop: 0, paddingTop: 0 }}
            onChangeText={() => {
              const params = {
                ids: [Number(currentOrganization?.id)],
                status: watch("status")?.value,
              };
              watch("status")?.value &&
                updateOrganizationStatus({
                  variables: {
                    data: params,
                  },
                });
            }}
            rules={{
              required: {
                value: true,
                message: "Select status",
              },
            }}
          />
        </View>
      </Modal>
    </CustomHeader>
  );
};

export default OrganizationScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    // padding: "12@ms",
  },
  selectedContainer: {},
  searchedResult: {
    marginBottom: "12@ms",
    borderRadius: "10@ms",
    padding: "8@ms",
  },
  searchContainer: {
    marginHorizontal: "12@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: { marginLeft: "12@ms" },
  organizationParentContainer: {
    // marginTop: "12@ms",
  },
  organizationContainer: {
    width: "100%",
    padding: "12@ms",
    borderRadius: "8@ms",
    marginBottom: "16@ms",
    gap: "8@ms",
  },
  organizationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  organizationInfo: {
    flexDirection: "row",
    gap: "15@ms",
  },
  status: {
    color: "green",
    borderRadius: "10@ms",
    width: "60@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
  label: {
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   Dimensions,
//   useColorScheme,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const OrganizationApp = () => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const [organizations, setOrganizations] = useState([
//     {
//       id: 1,
//       name: "TechCorp Solutions",
//       status: "Active",
//       description: "Leading software development company specializing in enterprise solutions and cloud infrastructure.",
//       isSubscribed: true
//     },
//     {
//       id: 2,
//       name: "Green Energy Ltd",
//       status: "Inactive",
//       description: "Renewable energy solutions provider focusing on solar and wind power installations.",
//       isSubscribed: false
//     },
//     {
//       id: 3,
//       name: "Digital Marketing Pro",
//       status: "Active",
//       description: "Full-service digital marketing agency helping businesses grow their online presence.",
//       isSubscribed: true
//     },
//     {
//       id: 4,
//       name: "Healthcare Innovations",
//       status: "Pending",
//       description: "Medical technology company developing AI-powered diagnostic tools for healthcare providers.",
//       isSubscribed: false
//     }
//   ]);

//   // Colors for both modes
//   const colors = {
//     light: {
//       background: '#F9FAFB',
//       cardBackground: '#FFFFFF',
//       textPrimary: '#111827',
//       textSecondary: '#6B7280',
//       border: '#E5E7EB',
//       statusActive: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
//       statusInactive: { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
//       statusPending: { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
//       subscriptionActive: '#10B981',
//       subscriptionInactive: '#9CA3AF',
//       emptyIcon: '#D1D5DB',
//       buttonEdit: '#3B82F6',
//       buttonToggle: '#10B981',
//       buttonDelete: '#EF4444',
//     },
//     dark: {
//       background: '#121212',
//       cardBackground: '#1E1E1E',
//       textPrimary: '#E0E0E0',
//       textSecondary: '#9E9E9E',
//       border: '#424242',
//       statusActive: { bg: '#1B4332', text: '#6EE7B7', border: '#10B981' },
//       statusInactive: { bg: '#7F1D1D', text: '#FCA5A5', border: '#EF4444' },
//       statusPending: { bg: '#78350F', text: '#FCD34D', border: '#F59E0B' },
//       subscriptionActive: '#10B981',
//       subscriptionInactive: '#757575',
//       emptyIcon: '#424242',
//       buttonEdit: '#2563EB',
//       buttonToggle: '#059669',
//       buttonDelete: '#DC2626',
//     }
//   };

//   const theme = colors.dark;

//   const handleEdit = (id, name) => {
//     Alert.alert(
//       "Edit Organization",
//       `Edit ${name}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Edit", onPress: () => console.log(`Edit organization with ID: ${id}`) }
//       ]
//     );
//   };

//   const handleDelete = (id, name) => {
//     Alert.alert(
//       "Delete Organization",
//       `Are you sure you want to delete ${name}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             setOrganizations(organizations.filter(org => org.id !== id));
//           }
//         }
//       ]
//     );
//   };

//   const handleStatusToggle = (id) => {
//     setOrganizations(organizations.map(org =>
//       org.id === id
//         ? { ...org, status: org.status === 'Active' ? 'Inactive' : 'Active' }
//         : org
//     ));
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Active':
//         return theme.statusActive;
//       case 'Inactive':
//         return theme.statusInactive;
//       case 'Pending':
//         return theme.statusPending;
//       default:
//         return { bg: theme.background, text: theme.textPrimary, border: theme.border };
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Active': return 'checkmark-circle';
//       case 'Inactive': return 'close-circle';
//       case 'Pending': return 'time';
//       default: return 'help-circle';
//     }
//   };

//   const OrganizationCard = ({ org }) => {
//     const statusStyle = getStatusStyle(org.status);

//     return (
//       <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
//         {/* Header */}
//         <View style={styles.cardHeader}>
//           <View style={styles.titleRow}>
//             <Ionicons name="business" size={20} color={theme.buttonEdit} />
//             <Text style={[styles.orgName, { color: theme.textPrimary }]} numberOfLines={1}>
//               {org.name}
//             </Text>
//             {org.isSubscribed && (
//               <Ionicons name="home" size={18} color="#F59E0B" />
//             )}
//           </View>
//         </View>

//         {/* Status Badge */}
//         <View style={styles.statusContainer}>
//           <View style={[styles.statusBadge, {
//             backgroundColor: statusStyle.bg,
//             borderColor: statusStyle.border
//           }]}>
//             <Ionicons
//               name={getStatusIcon(org.status)}
//               size={12}
//               color={statusStyle.text}
//               style={styles.statusIcon}
//             />
//             <Text style={[styles.statusText, { color: statusStyle.text }]}>
//               {org.status}
//             </Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={3}>
//           {org.description}
//         </Text>

//         {/* Subscription Status */}
//         {/* <View style={[styles.subscriptionContainer, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F9FAFB' }]}>
//           <Text style={[styles.subscriptionLabel, { color: theme.textPrimary }]}>
//             Subscription
//           </Text>
//           <View style={styles.subscriptionStatus}>
//             <Text style={[styles.subscriptionText, {
//               color: org.isSubscribed ? theme.subscriptionActive : theme.subscriptionInactive
//             }]}>
//               {org.isSubscribed ? 'Active' : 'Inactive'}
//             </Text>
//             <View style={[styles.subscriptionDot, {
//               backgroundColor: org.isSubscribed ? theme.subscriptionActive : theme.subscriptionInactive
//             }]} />
//           </View>
//         </View> */}

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.buttonEdit }]}
//             onPress={() => handleEdit(org.id, org.name)}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="create-outline" size={16} color="#FFFFFF" />
//             <Text style={styles.buttonText}>Edit</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.buttonToggle }]}
//             onPress={() => handleStatusToggle(org.id)}
//             activeOpacity={0.8}
//           >
//             <Ionicons
//               name={org.status === 'Active' ? 'toggle' : 'toggle-outline'}
//               size={16}
//               color="#FFFFFF"
//             />
//             <Text style={styles.buttonText}>Toggle</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.buttonDelete }]}
//             onPress={() => handleDelete(org.id, org.name)}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
//             <Text style={styles.buttonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

//       {/* Header */}
//       <View style={[styles.header, {
//         backgroundColor: theme.cardBackground,
//         borderBottomColor: theme.border
//       }]}>
//         <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Organizations</Text>
//         <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Manage your organization data</Text>
//       </View>

//       <ScrollView
//         style={[styles.scrollView, { backgroundColor: theme.background }]}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {organizations.map((org) => (
//           <OrganizationCard key={org.id} org={org} />
//         ))}

//         {organizations.length === 0 && (
//           <View style={styles.emptyState}>
//             <Ionicons name="business" size={64} color={theme.emptyIcon} />
//             <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>No organizations</Text>
//             <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
//               Get started by adding your first organization.
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//   },
//   card: {
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//     borderWidth: 1,
//   },
//   cardHeader: {
//     marginBottom: 16,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   orgName: {
//     fontSize: 18,
//     fontWeight: '600',
//     flex: 1,
//   },
//   statusContainer: {
//     marginBottom: 16,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   statusIcon: {
//     marginRight: 6,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   subscriptionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   subscriptionLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   subscriptionStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   subscriptionText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   subscriptionDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     gap: 6,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 48,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default OrganizationApp;
