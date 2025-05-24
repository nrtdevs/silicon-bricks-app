import { Alert, FlatList, Pressable, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangePlanStatusDocument,
  CreateMultipleOrderDocument,
  CreatePlanDocument,
  DeletePlanDocument,
  DropdownOffersDocument,
  FindPlanByIdDocument,
  PaginatedCouponsDocument,
  PaginatedPackagesDocument,
  PaginatedPlansDocument,
  UpdatePlanDocument,
  VerifyPaymentDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
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
import RazorpayCheckout from "react-native-razorpay";
import alertMsg from "@/constants/alertMsg";
import { router } from "expo-router";

const defaultValue = {
  name: "",
  discountPrice: "",
  duration: "",
  price: "",
  package: "",
  coupon: "",
  description: "",
  status: "",
  id: "",
};

const statusData = [
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Inactive", value: "inactive" },
  { label: "Used", value: "used" },
];

const PurchasePlaneScreen = () => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  ``;
  const [page, setPage] = useState<number>(1);
  const [verifyPayment] = useMutation(VerifyPaymentDocument, {
    onCompleted: (data) => {
      console.log('payment verified');

    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  })
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string>("");
  const [currentPlan, setCurrentPlan] = useState<{
    name: string;
    discountPrice: string;
    duration: string;
    price: string;
    package: any;
    coupon: any;
    description: string;
    status: any;
    id: string;
  }>(defaultValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{
    name: string;
    discountPrice: string;
    duration: string;
    price: string;
    package: any;
    coupon: any;
    description: string;
    status: any;
  }>({
    defaultValues: {},
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { can, hasAny } = useUserContext();

  const [plansData, { error, data: planData, loading, refetch }] = useLazyQuery(
    PaginatedPlansDocument
  );
  const [FindPlanById, { data }] = useLazyQuery(FindPlanByIdDocument);
  const [dropdownOfferData, offerState] = useLazyQuery(DropdownOffersDocument);
  const [CreatePayment] = useMutation(CreateMultipleOrderDocument)

  const [dropdownCouponData, couponData] = useLazyQuery(
    PaginatedCouponsDocument
  );

  const [dropdownPackageData, packageData] = useLazyQuery(
    PaginatedPackagesDocument
  );

  const [createPlan, createPlanState] = useMutation<any>(CreatePlanDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updatePlan, updatePlanState] = useMutation(UpdatePlanDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setEditModal(false);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [deletePlan, deletePlanState] = useMutation(DeletePlanDocument, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updatePlanStatus, updatePlanStatusState] = useMutation(
    ChangePlanStatusDocument,
    {
      onCompleted: (data) => {
        refetch();
        setStatusModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (watch("status")) {
      updatePlanStatus({
        variables: {
          updatePlanStatusInput: {
            ids: [Number(currentPlanId)],
            status: watch("status")?.value,
          },
        },
      });
    }
  }, [watch("status")]);

  // packageData?.data?.paginatedPackages?.data
  useEffect(() => {
    if (watch("package")) {
      console.log("00000", watch("package"));
      setValue("price", watch("package")?.price.toString());
    }
  }, [watch("package")]);

  // useEffect(() => {
  //     console.log('00000', currentPlan);

  //     setValue("name", currentPlan?.name || "");
  //     setValue("discountPrice", currentPlan?.discountPrice);
  //     setValue("duration", currentPlan?.duration || "");
  //     setValue("price", currentPlan?.price || "");
  //     setValue("offer", currentPlan?.offer || "");
  //     setValue("package", currentPlan?.package || "");
  //     setValue("coupon", currentPlan?.coupon || "");
  //     setValue("description", currentPlan?.description || "");
  // }, [currentPlan]);
  // console.log('00000', currentPlan);

  const fetchCoupons = async (isRefreshing = false) => {
    if (isRefreshing) {
      setPage(1);
      setRefreshing(true);
    }
    // Params for API
    const params = {
      per_page_record: 10,
      page: isRefreshing ? 1 : page,
    };

    await plansData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
  };

  const fetchDropdownData = () => {
    dropdownOfferData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    dropdownCouponData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    dropdownPackageData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
  };

  const onSubmit = (data: any) => {
    try {
      let params = {
        name: data?.name,
        duration: Number(data?.duration),
        packageId:
          typeof data?.package == "string"
            ? Number(data?.package)
            : Number(data?.package?.id),
        price: Number(data?.price),
        // couponId: typeof data?.coupon == 'string' ? Number(data?.coupon) : Number(data?.coupon?.id),
        description: data?.description,
      };

      let params2 = {
        id: Number(currentPlan?.id),
        ...params,
      };

      console.log("params3", data?.coupon);
      console.log("params3", data?.package);
      console.log("params3", typeof data?.price);
      console.log("params3", params);

      editModal
        ? updatePlan({
          variables: {
            updatePlanInput: params2,
          },
        })
        : createPlan({
          variables: {
            createPlanInput: params,
          },
        });
    } catch (error) {
      console.log("error in onSubmit", error);
    }
  };

  const Pay = async (formData) => {
    const planIdRes = await FindPlanById({ variables: { findPlanByIdId: Number(formData.id) } });
    // console.log('planIdRes22', planIdRes?.data?.findPlanById?.name);
    // return;

    const response = await CreatePayment({
      variables: {
        input: {
          planIds: [Number(formData.id)],
          duration: Number(formData.duration),
          couponCode: formData.couponCode ?? '',
          amount: 1000,
        }
      }
    })
    const order = response?.data?.createMultipleOrder

    // const options = {
    //   key: RAZORPAYKEY,
    //   amount: finalTotal,
    //   currency: order.currency,
    //   duration: formData.duration,
    //   order_id: order.id,
    //   Image: 'https://example.com/your_logo',
    //   handlePaymentSuccess,
    //   name: data?.findPlanById?.name,
    // handler: function (response: any) {
    //   handlePaymentSuccess(response)
    // },
    //   theme: { color: '#3399cc' },
    // }

    // rzp_test_yrANCWqt1Qye8M

    const options: any = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: order.currency ?? "inr",
      duration: formData.duration,
      key: "rzp_test_yrANCWqt1Qye8M",
      amount: 409 * 100,
      // handlePaymentSuccess,
      name: planIdRes?.data?.findPlanById?.name,
      order_id: order.id,
      // prefill: {
      //   email: "sidhdadatri@gmail.com",
      //   contact: "9999999999",
      //   name: "Sidhdadatri",
      // },
      // handler: function (response: any) {
      //   handlePaymentSuccess(response, formData.id)
      // },
      theme: { color: Colors.primary },
      remember_customer: true,
    };

    console.log("options", options);

    try {
      const data = await RazorpayCheckout?.open(options);
      console.log('00099', data?.razorpay_payment_id);
      if (data?.razorpay_payment_id) {
        console.log("098778", data);
        handlePaymentSuccess(data, formData.id)
      } else {
        Alert.alert(alertMsg.error, "Something went wrong");
      }
    } catch (error: any) {
      console.log("Razorpay Error:", error);
      Alert.alert(alertMsg.error, "Error during payment");
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={[
          styles.organizationContainer,
          { backgroundColor: Colors[theme].cart },
        ]}
      >
        <View style={styles.organizationHeader}>
          <ThemedText type="title" style={{ flex: 1, fontSize: ms(26) }}>
            {item?.name}
          </ThemedText>
        </View>

        {item?.description && (
          <ThemedText style={[styles.description]}>
            {item?.description}
          </ThemedText>
        )}

        <View style={styles.userInfo}>
          <ThemedText type="title" style={{ fontSize: ms(22) }}>
            ${item?.price}{" "}
            <ThemedText style={{ fontSize: ms(20), color: "gray" }}>
              /month
            </ThemedText>
          </ThemedText>
          <ThemedText style={{ fontSize: ms(18) }}>20% OFF</ThemedText>
        </View>

        <CustomButton
          title="Choose Plan"
          onPress={() => Pay(item)}
          style={{
            backgroundColor: Colors[theme].background,
            marginTop: vs(10),
          }}
        />
      </View>
    );
  };

  const handlePaymentSuccess = async (data: any, id: any) => {
    // : { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    // console.log('999', id);
    let params = {
      planIds: [Number(id)],
      amount: 409 * 100,
      duration: 40,
      couponCode: 'test555',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    }
    try {
      const reponse = await verifyPayment({
        variables: {
          input: params,
        },
      });

      if (reponse?.data?.verifyPayment) {
        // toast.success(FM('PAYMENT_SUCCESSFUL'));
        // navigate('/dashboard');
        router.replace('/(drawer)/(tabs)')
      } else {
        // toast.error(
        //   FM('PAYMENT_FAILED')
        // );
      }
    }
    catch (error) {
      // const apolloError = error as ApolloError;
      // toast.error(apolloError?.message || FM('FAILED_DUE_TO_ERROR'));
    }
  }

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={planData?.paginatedPlans?.data}
            renderItem={renderItem}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={() => fetchCoupons(true)}
            //     />
            // }
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
          // ListFooterComponent={
          //     hasMore ? (
          //         <ActivityIndicator size="small" color={Colors.primary} />
          //     ) : null
          // }
          // onEndReached={() => {
          //     if (hasMore && !isLoading) {
          //         fetchNotification();
          //     }
          // }}
          // onEndReachedThreshold={0.5}
          />
        </View>
      </ThemedView>
    </CustomHeader>
  );
};

export default PurchasePlaneScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  selectedContainer: {
    width: "100%",
    position: "absolute",
    top: "60@vs",
    alignSelf: "center",
  },
  searchedResult: {
    marginBottom: "12@ms",
    borderRadius: "10@ms",
    padding: "8@ms",
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
  buttonContainer: { marginLeft: "12@ms" },
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
    flexDirection: "row",
    gap: "15@ms",
  },
  description: {
    borderRadius: "10@ms",
    fontSize: "20@ms",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
  userInfo: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});


