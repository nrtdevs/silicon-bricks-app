import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import CustomButton from "@/components/CustomButton";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useTheme } from "@/context/ThemeContext";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateUserDocument,
  CreateVehicleDocument,
  DropdownRolesDocument,
  UpdateUserDocument,
  UpdateVehicleDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "@/components/CustomHeader";
import * as FileSystem from "expo-file-system";

const designationData = [
  { label: "CEO", value: "CEO" },
  { label: "CTO", value: "CTO" },
  { label: "Employee", value: "EMPLOYEE" },
  { label: "HR", value: "HR" },
  { label: "Manager", value: "MANAGER" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Team Lead", value: "TEAM_LEAD" },
];

const pickerData = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
  { label: "Pending", value: "pending" },
];

const userTypeData = [
  { label: "admin", value: "admin" },
  { label: "adminEmployee", value: "adminEmployee" },
  { label: "organization", value: "organization" },
  { label: "organizationEmployee", value: "organizationEmployee" },
];

const AddEditUser = () => {
  const insuranceOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [
    getUserRoles,
    { data: roleData, loading: roleLoading, error: roleError },
  ] = useLazyQuery(DropdownRolesDocument);
  // console.log('data', roleData);

  useEffect(() => {
    getUserRoles({
      variables: {
        listInputDto: {},
      },
    });
  }, []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1996 }, (_, index) => ({
      label: (1997 + index).toString(),
      value: (1997 + index).toString(),
    }));
  }, []);
  const [image, setImage] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{
    name: string;
    email: string;
    phoneNo: string;
    roles: any[];
    usertype: any;
    status: any;
    designation: any;
  }>({
    defaultValues: {},
  });
  const { theme } = useTheme();
  const { data: editedData } = useLocalSearchParams<any>();

  const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
    getDateTimePickerProps(false)
  );

  useFocusEffect(
    useCallback(() => {
      if (editedData) {
        const parsedData = JSON.parse(editedData);
        let rolesId = parsedData?.roles?.map((item: any) => {
          return item?.id;
        });
        setImage(parsedData?.avatar);
        setValue("name", parsedData?.name);
        setValue("email", parsedData?.email);
        setValue("phoneNo", parsedData?.mobileNo.toString());
        setValue("roles", rolesId);
        setValue("usertype", parsedData?.userType);
        // setValue("id", parsedData?.id);
        // setValue("imagePath", parsedData?.avatar);
        setValue("designation", parsedData?.designation);
      }
    }, [editedData])
  );

  const [updateUser, updateUserState] = useMutation(UpdateUserDocument, {
    onCompleted: (data) => {
      setImage("");
      reset();
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [createUser, createUserState] = useMutation(CreateUserDocument, {
    onCompleted: (data) => {
      setImage("");
      reset();
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const uploadImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        console.error("File does not exist:", uri);
        return;
      }

      const fileExtension = uri.split(".").pop() || "jpg"; // Default to jpg if no extension
      const mimeType = `image/${fileExtension}`;

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `upload.${fileExtension}`,
        type: mimeType,
      } as unknown as Blob);

      // formData.append("file", {
      //   uri: uri,
      //   name: `upload.${fileExtension}`,
      //   type: mimeType,
      // } as any);

      const uploadResponse = await fetch(`${Env.SERVER_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!uploadResponse.ok) {
        const err = await uploadResponse.text();
        throw new Error(`Upload failed: ${err}`);
      }
      const responseData = await uploadResponse.json();
      // console.log("Upload successful:", responseData?.files[0]);
      setImage(responseData?.files[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  };

  const onSubmit = (data: any) => {
    try {
      const roleIds: number[] = [];
      if (data?.roles && Array.isArray(data.roles)) {
        for (let i = 0; i < data.roles.length; i++) {
          roleIds.push(Number(data.roles[i]));
        }
      }

      const params: any = {
        designation:
          typeof data?.designation == "string"
            ? data?.designation
            : data?.designation?.value,
        email: data?.email,
        mobileNo: Number(data?.phoneNo),
        name: data?.name,
        roleIds: roleIds,
        userType:
          typeof data?.usertype == "string"
            ? data?.usertype
            : data?.usertype?.value,
        avatar: image,
      };
      //   let updateParams = {
      //     id: Number(parse?.id),
      //     ...params,
      //   }
      if (editedData) {
        const parsedData = JSON.parse(editedData);
        updateUser({
          variables: {
            data: {
              ...params,
              id: Number(parsedData?.id),
            },
          },
        });
        return;
      }
      createUser({
        variables: {
          data: params,
        },
      });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  if (createUserState.loading || updateUserState.loading) return <Loader />;

  return (
    <CustomHeader title={editedData ? "Edit User" : "Add User"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // backgroundColor: Colors[theme].cart,
          width: "100%",
          borderRadius: 10,
          alignSelf: "center",
          paddingHorizontal: 10,
          paddingVertical: 22,
          justifyContent: "flex-start",
          paddingBottom: 50,
        }}
      >
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <ThemedText type="subtitle">User</ThemedText>
        </View> */}

        <View
          style={{
            paddingHorizontal: 10,
            position: "relative",
            paddingBottom: 30,
            paddingTop: 0,
          }}
        >
          <Pressable style={styles.imageContainer}>
            <Image
              source={{
                uri: `${Env?.SERVER_URL}${image}`,
              }}
              style={styles.image}
            />
          </Pressable>
          <Pressable onPress={handleImagePickerPress} style={styles?.editImage}>
            <Feather
              name="edit-2"
              size={ms(20)}
              color="black"
              style={{ fontWeight: "bold" }}
            />
          </Pressable>

          <CustomValidation
            type="input"
            control={control}
            labelStyle={styles.label}
            name={"name"}
            inputStyle={[{ lineHeight: ms(20) }]}
            label={"Name"}
            rules={{
              required: "Name is required",
            }}
            autoCapitalize="none"
          />

          <CustomValidation
            type="input"
            control={control}
            name={"email"}
            label={"Email"}
            labelStyle={styles.label}
            rules={{
              required: "User email is required",
            }}
          />

          <CustomValidation
            type="input"
            control={control}
            name={"phoneNo"}
            // keyboardType="phone-pad"
            label={"Phone No"}
            labelStyle={styles.label}
            rules={{
              required: "User phoneNo is required",
            }}
          />

          <CustomValidation
            data={designationData}
            type="picker"
            hideStar={false}
            control={control}
            name="designation"
            label="Designation"
            labelStyle={styles.label}
            placeholder="Select Designation"
            inputStyle={{ height: vs(50) }}
            rules={{
              required: {
                value: true,
                message: "Select a designation",
              },
            }}
          />

          <CustomValidation
            data={roleData?.dropdownRoles?.data}
            type="picker"
            hideStar={false}
            keyToCompareData="id"
            keyToShowData="name"
            control={control}
            name="roles"
            label="Role"
            labelStyle={styles.label}
            multiSelect
            placeholder="Select role name"
            inputStyle={{ height: vs(50) }}
            rules={{
              required: {
                value: true,
                message: "Select a role",
              },
            }}
          />

          <CustomValidation
            data={userTypeData}
            type="picker"
            hideStar={false}
            control={control}
            keyToCompareData="value"
            keyToShowData="label"
            label="User Type"
            labelStyle={styles.label}
            name="usertype"
            placeholder="Select UserType"
            inputStyle={{ height: vs(50) }}
            rules={{
              required: {
                value: true,
                message: "Select a User Type",
              },
            }}
          />
        </View>

        <CustomButton
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: Colors[theme].background,
            // marginTop: vs(10),
            marginHorizontal: 10,
          }}
        />
      </ScrollView>
    </CustomHeader>
  );
};

export default AddEditUser;

const styles = ScaledSheet.create({
  imageContainer: {
    width: "90@ms",
    height: "90@ms",
    borderRadius: "70@ms",
    marginBottom: "12@ms",
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: ms(50),
    resizeMode: "cover",
  },
  editImage: {
    position: "absolute",
    top: 3,
    left: 55,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});
