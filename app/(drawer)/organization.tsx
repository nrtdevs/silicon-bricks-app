// import { GetAllOrganisations } from '@/graphql/Query'
// import { useLazyQuery, useMutation } from '@apollo/client'
// import React, { useEffect, useState } from 'react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
// import { z } from 'zod'
// import {
//   StyleSheet,
//   View,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Dimensions
// } from 'react-native'
// import {
//   Text,
//   ActivityIndicator,
//   Dialog,
//   Portal,
//   FAB
// } from 'react-native-paper'

// import Feather from '@expo/vector-icons/Feather'
// import { Controller, useForm } from 'react-hook-form'
// import { Colors } from '@/constants/Colors'
// import { ScrollView } from 'react-native-gesture-handler'
// import { CreateOrganizationDocument } from '@/graphql/generated'

// interface OrganizationData {
//   id: number
//   name: string
//   description: string
//   status: string
// }

// const Organization = () => {
//   const [visible, setVisible] = useState(false)
//   const [editVisible, setEditVisible] = useState(false)
//   const [deletePopupVisible, setDeletePopupVisible] = useState<any>(false)
//   const [viewButtonVisible, setViewButtonVisible] = useState(false)

//   const [selectedOrganization, setSelectedOrganization] =
//     useState<OrganizationData | null>(null)

//   const [deleteOrganizationId, setDeleteOrganizationId] = useState<
//     number | null
//   >(null)

//   const [createAddRequestOrganization] = useMutation(AddOrganization)
//   const [updateOrganization] = useMutation(CreateOrganizationDocument)
//   const [deleteOrganization] = useMutation(DeleteOrganizationDocument)

//   const showDialogue = () => setVisible(true)
//   const hideDialogue = () => {
//     setVisible(false)
//     refetch()
//   }
//   const showEditDialogue = (organization: any) => {
//     setSelectedOrganization(organization)
//     setEditVisible(true)
//   }
//   const hideEditDialogue = () => {
//     refetch()
//     setEditVisible(false)
//   }

//   const showAddDialogue = (data: any) => {
//     setVisible(true)
//   }

//   const showDeleteDialogue = (organization: OrganizationData) => {
//     setDeleteOrganizationId(organization.id)
//     setDeletePopupVisible(true)
//   }
//   const hideDeleteDialogue = () => {
//     refetch()
//     setDeletePopupVisible(false)
//   }

//   const showViewButton = (organization: OrganizationData) => {
//     setSelectedOrganization(organization)
//     setViewButtonVisible(true)
//   }
//   const hideViewButton = () => {
//     setViewButtonVisible(false)
//   }

//   const [getOrganizations, { data, loading, refetch, error }] =
//     useLazyQuery(GetAllOrganisations)

//   useEffect(() => {
//     getOrganizations({
//       variables: {
//         listInputDto: {
//           page: 1,
//           limit: 10
//         }
//       }
//     })
//   }, [getOrganizations])

//   const datax = data?.paginatedOrganization?.data

//   const statusStyle = (status: string) => {
//     switch (status) {
//       case 'active':
//         return styles.score
//       case 'inactive':
//         return styles.score
//       case 'pending':
//         return styles.score
//       case 'blocked':
//         return styles.score
//     }
//   }

//   const schema = z.object({
//     name: z.string().min(4, { message: 'Name is required' }),
//     description: z.string().min(4, { message: 'Description is required' })
//   })

//   const {
//     control,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(schema)
//   })

//   const onSubmit = async (data: any) => {
//     try {
//       createAddRequestOrganization({
//         variables: {
//           createOrganizationInput: {
//             name: data.name,
//             description: data.description
//           }
//         }
//       })

//       refetch()
//       setVisible(false)
//     } catch (error) {
//       console.log(error)
//     }
//     reset()
//   }

//   const handleEdit = async (data: any) => {
//     if (!selectedOrganization) return
//     let param = {
//       id: Number(selectedOrganization.id),
//       name: data.name,
//       description: data.description
//     }
//     try {
//       const UpdateEditOrganization = await updateOrganization({
//         variables: {
//           updateOrganizationInput: param
//         }
//       })

//       refetch()
//       setEditVisible(false)
//     } catch (error) {
//       console.log('error', error)
//     }
//     reset()
//   }

//   const handleView = async (data: any) => {
//     if (!selectedOrganization) return
//     let param = {
//       id: Number(selectedOrganization.id),
//       name: data.name,
//       description: data.description
//     }
//     try {
//       const UpdateEditOrganization = await updateOrganization({
//         variables: {
//           updateOrganizationInput: param
//         }
//       })

//       refetch()
//       setEditVisible(false)
//     } catch (error) {
//       console.log('error', error)
//     }
//     reset()
//   }

//   const handleDelete = async () => {
//     try {
//       const DeleteOrganization = await deleteOrganization({
//         variables: {
//           deleteOrganizationId: Number(deleteOrganizationId)
//         }
//       })

//       refetch()
//       setDeletePopupVisible(false)
//     } catch (error) {
//       console.log('error', error)
//     }
//     reset()
//   }

//   if (loading) {
//     return <ActivityIndicator animating={true} size="large" />
//   }

//   if (error) {
//     return <Text>Error fetching organizations: {error.message}</Text>
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={datax}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.userInfo}>
//               <Text style={styles.name}>
//                 {item.name.slice(0, 20)}
//                 {item.name.length > 15 && '...'}
//               </Text>

//               {/* <Text style={styles.title}>{item.description}</Text> */}
//             </View>
//             <View style={styles.actions}>
//               {/* <View style={styles.scoreContainer}>
//                 <Text style={statusStyle(item.status)}>{item.status}</Text>
//               </View> */}

//               <TouchableOpacity
//                 onPress={() => showViewButton(item)}
//                 style={styles.ViewButton}
//               >
//                 <Feather name="eye" size={24} color="white" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => showEditDialogue(item)}
//                 style={styles.editButton}
//               >
//                 <Feather name="edit" size={24} color="white" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => showDeleteDialogue(item)}
//                 style={styles.deleteButton}
//               >
//                 <MaterialCommunityIcons
//                   name="delete-empty"
//                   size={24}
//                   color="white"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         keyExtractor={(item: OrganizationData) => item.id.toString()}
//       />

//       {/* Floating Action Button (FAB) */}
//       <View style={styles.fabButtonContainer}>
//         <FAB
//           icon="plus"
//           style={styles.fabButton}
//           color="white"
//           onPress={showDialogue}
//         />
//       </View>

//       <Portal>
//         <Dialog visible={visible} onDismiss={hideDialogue}>
//           <Dialog.Title style={styles.dialogueTitle}>
//             Add Organization
//           </Dialog.Title>
//           <Dialog.Content>
//             <Text style={styles.label}>Name</Text>
//             <Controller
//               control={control}
//               name="name"
//               render={({ field: { onChange, onBlur, value } }: any) => (
//                 <TextInput
//                   placeholder="Name..."
//                   style={styles.input}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                 />
//               )}
//             />
//             {errors.name && (
//               <Text style={styles.error}>{errors.name.message}</Text>
//             )}
//             <Text style={styles.label}>Description</Text>
//             <Controller
//               control={control}
//               name="description"
//               render={({ field: { onChange, onBlur, value } }: any) => (
//                 <TextInput
//                   placeholder="Description..."
//                   style={styles.input}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                 />
//               )}
//             />
//             {errors.description && (
//               <Text style={styles.error}>{errors.description.message}</Text>
//             )}
//           </Dialog.Content>
//           <Dialog.Actions>
//             <TouchableOpacity
//               onPress={handleSubmit(onSubmit)}
//               style={styles.buttonContainerSave}
//             >
//               <Text>Save</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={hideDialogue}
//               style={styles.buttonContainerClose}
//             >
//               <Text>Close</Text>
//             </TouchableOpacity>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <Portal>
//         <Dialog visible={editVisible} onDismiss={hideEditDialogue}>
//           <Dialog.Title style={styles.dialogueTitle}>Edit Org</Dialog.Title>
//           <Dialog.Content>
//             <Text style={styles.label}>Name</Text>
//             <Controller
//               control={control}
//               name="name"
//               defaultValue={selectedOrganization?.name || ''}
//               render={({ field: { onChange, onBlur, value } }: any) => (
//                 <TextInput
//                   placeholder="Name..."
//                   style={styles.input}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                 />
//               )}
//             />
//             {errors.name && (
//               <Text style={styles.error}>{errors.name.message}</Text>
//             )}
//             <Text style={styles.label}>Description</Text>
//             <Controller
//               control={control}
//               name="description"
//               defaultValue={selectedOrganization?.description || ''}
//               render={({ field: { onChange, onBlur, value } }: any) => (
//                 <TextInput
//                   placeholder="Description..."
//                   style={styles.input}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                 />
//               )}
//             />
//             {errors.description && (
//               <Text style={styles.error}>{errors.description.message}</Text>
//             )}
//           </Dialog.Content>
//           <Dialog.Actions>
//             <TouchableOpacity
//               onPress={handleSubmit(handleEdit)}
//               style={styles.buttonContainerSave}
//             >
//               <Text>Save</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={hideEditDialogue}
//               style={styles.buttonContainerClose}
//             >
//               <Text>Close</Text>
//             </TouchableOpacity>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <Portal>
//         <Dialog visible={viewButtonVisible} onDismiss={hideViewButton}>
//           <Dialog.Title style={styles.dialogueTitle}>View Org</Dialog.Title>
//           <Dialog.Content>
//             <View style={styles.dialogueContent}>
//               <Text style={styles.viewLabel}>Name : </Text>
//               <Text style={styles.viewLabelFooter}>
//                 {selectedOrganization?.name}
//               </Text>
//             </View>
//             <View style={styles.dialogueContent}>
//               <Text style={styles.viewLabel}>Description : </Text>
//               <Text style={styles.viewLabelFooter}>
//                 {selectedOrganization?.description}
//               </Text>
//             </View>
//           </Dialog.Content>
//           <Dialog.Actions>
//             <TouchableOpacity
//               onPress={hideViewButton}
//               style={styles.buttonContainerClose}
//             >
//               <Text>Close</Text>
//             </TouchableOpacity>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <Portal>
//         <Dialog visible={deletePopupVisible} onDismiss={hideDeleteDialogue}>
//           <Dialog.Title style={styles.dialogueTitle}>Delete Org</Dialog.Title>
//           <Dialog.Content>
//             <Text style={styles.label}>
//               Do You Want To Really Delete The Organization{' '}
//             </Text>
//           </Dialog.Content>
//           <Dialog.Actions>
//             <TouchableOpacity
//               onPress={handleDelete}
//               style={styles.buttonContainerSave}
//             >
//               <Text>Yes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={hideDeleteDialogue}
//               style={styles.buttonContainerClose}
//             >
//               <Text>No</Text>
//             </TouchableOpacity>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </View>
//   )
// }

// export default Organization

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   fabButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     zIndex: 1
//   },
//   fabButton: {
//     backgroundColor: Colors.backgroundColorPrimary
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.backgroundColorPrimary,
//     marginBottom: 5,
//     textAlign: 'left',
//     alignSelf: 'flex-start'
//   },
//   error: {
//     color: 'red',
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//     marginBottom: 10
//   },
//   input: {
//     height: 59,
//     borderWidth: 2,
//     borderColor: Colors.backgroundColorPrimary,
//     borderRadius: 20,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#F1F4FF'
//   },
//   dialogueTitle: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   buttonContainerSave: {
//     backgroundColor: '#3B82F6',
//     borderRadius: 10,
//     paddingVertical: 15,
//     marginTop: 10,
//     paddingHorizontal: 20
//   },
//   buttonContainerClose: {
//     backgroundColor: 'gray',
//     borderRadius: 10,
//     paddingVertical: 15,
//     marginTop: 10,
//     paddingHorizontal: 20
//   },

//   card: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: "#8ea8ff6e",
//     backgroundColor: '#dadada',
//     padding: 10,
//     margin: 8,
//     borderRadius: 12,
//     height: 80,
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     shadowColor: 'black',
//     elevation: 5
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white'
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   scoreContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     color: 'black !important',
//     backgroundColor: '#ff00aa',
//     borderRadius: 15,
//     paddingVertical: 2,
//     paddingHorizontal: 6,
//     marginRight: 8
//   },
//   score: {
//     color: 'blue',
//     fontSize: 14,
//     fontWeight: 'bold'
//   },
//   deleteButton: {
//     backgroundColor: '#ee0b0b',
//     padding: 6,
//     borderRadius: 20,
//     marginLeft: 8
//   },
//   editButton: {
//     backgroundColor: '#007AFF',
//     padding: 6,
//     borderRadius: 20,
//     marginRight: 3
//   },
//   ViewButton: {
//     backgroundColor: '#007AFF',
//     padding: 6,
//     borderRadius: 20,
//     marginRight: 8
//   },
//   dialogueContent: {
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center', // Make sure items are vertically aligned
//     position: 'relative',
//     flexWrap: 'nowrap' // Prevent wrapping, so items stay in a single line
//   },

//   viewLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//     marginRight: 5,
//     maxWidth: '40%', // Adjust as per your layout requirement
//     flexShrink: 1
//   },

//   viewLabelFooter: {
//     fontSize: 16,
//     color: 'black',
//     position: 'relative',
//     maxWidth: '55%', // Adjust as per your layout requirement
//     flexShrink: 1
//   }
// })

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { PaginatedOrganizationDocument } from "@/graphql/generated";
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

const organization = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [organizationData, { error, data }] = useLazyQuery(
    PaginatedOrganizationDocument
  );
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);

  const pickerData = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await organizationData({
          variables: {
            listInputDto: {},
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={{ width: "90%" }}>
            <CustomSearchBar
              searchQuery={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
              }}
              placeholder={labels?.searchTeam}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedOrganization?.data}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={[
                  styles.organizationContainer,
                  { backgroundColor: Colors[theme].cartBg },
                ]}
              >
                <View style={styles.organizationHeader}>
                  <ThemedText type="subtitle">{item?.name}</ThemedText>
                  <View style={styles.organizationInfo}>
                    <MaterialIcons
                      name="attractions"
                      size={ms(20)}
                      color={Colors[theme].text}
                      onPress={() => {
                        setStatusModalVisible(true);
                      }}
                    />
                    <Feather
                      onPress={() => {
                        setEditModalVisible(true);
                      }}
                      name="edit"
                      size={ms(20)}
                      color={Colors[theme].text}
                    />
                    <MaterialIcons
                      name="delete-outline"
                      size={ms(20)}
                      color={Colors[theme].text}
                      onPress={() => {
                        Alert.alert(
                          "Delete",
                          "Are you sure you want to delete?",
                          [
                            { text: "Yes", onPress: () => { } },
                            { text: "No", onPress: () => { } },
                          ]
                        );
                      }}
                    />
                  </View>
                </View>
                <ThemedText
                  style={[
                    styles.status,
                    {
                      color:
                        item.status == "active" ? Colors?.green : "#6d6d1b",
                      backgroundColor:
                        theme == "dark" ? Colors?.white : "#e6e2e2",
                    },
                  ]}
                >
                  {item?.status}
                </ThemedText>
                <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                  {item?.description}
                </ThemedText>
              </View>
            )}
          />
        </View>
      </ThemedView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Colors[theme].background,
            height: 550,
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
            <ThemedText type="subtitle">
              {labels?.createOraganization}
            </ThemedText>
            <Pressable
              onPress={() => {
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
              name="moduleName"
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              placeholder={"Enter Module"}
              onFocus={() => setIsFocused("moduleName")}
              rules={{
                required: "Module name is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name="subscription"
              label={"Subscription"}
              placeholder={"Enter Module"}
              labelStyle={styles.label}
              onFocus={() => setIsFocused("subscription")}
              rules={{
                required: "Subscription is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name="description"
              label={"Description"}
              placeholder={"Enter description"}
              labelStyle={styles.label}
              onFocus={() => setIsFocused("description")}
              rules={{
                required: "Description is required",
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            onPress={() => { }}
            style={{ backgroundColor: Colors[theme].cartBg, marginTop: vs(10) }}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => setEditModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Colors[theme].background,
            height: 550,
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
            <ThemedText type="subtitle">Edit</ThemedText>
            <Pressable
              onPress={() => {
                setEditModalVisible(false);
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
              name="testOrganization"
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              placeholder={"Test Organization"}
              onFocus={() => setIsFocused("testOrganization")}
              rules={{
                required: "Text organization is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name="testOrganization"
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Subscription"}
              placeholder={"Test Organization"}
              onFocus={() => setIsFocused("testOrganization")}
              rules={{
                required: "Text organization is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name="testDescription"
              label={"Description"}
              placeholder={"Test organization description"}
              labelStyle={styles.label}
              onFocus={() => setIsFocused("testDescription")}
              rules={{
                required: "Test organization description is required",
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            onPress={() => { }}
            style={{ backgroundColor: Colors[theme].cartBg, marginTop: vs(10) }}
          />
        </View>
      </Modal>


      <Modal
        isVisible={isStatusModalVisible}
        onBackdropPress={() => setStatusModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Colors?.white,
            height: 250,
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <CustomValidation
            data={pickerData}
            type="picker"
            hideStar
            control={control}
            keyToShowData="title"
            keyToCompareData="_id"
            name="topic"
            placeholder="Topic"
            inputStyle={{ height: vs(50) }}
            rules={{
              required: {
                value: true,
                message: "Select a topic",
              },
            }}
          />
        </View>
      </Modal>
    </CustomHeader>
  );
};

export default organization;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: "12@ms",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: {},
  organizationParentContainer: {
    marginTop: "12@ms",
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
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    color: "green",
    borderRadius: "10@ms",
    width: "60@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});
