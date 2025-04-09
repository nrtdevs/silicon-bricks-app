import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import { ThemedView } from "@/components/ThemedView";
import { labels } from "@/constants/Labels";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";


interface EditPromotionData {
    email: string;
    password: string;
    confirmPassword: string;
}
const pickerData = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed", value: "fixed" },
];
const dicountType = [
    { label: "Cashback", value: "cashback" },
    { label: "Discount", value: "discount" },
    { label: "Buy One Get One", value: "buy_one_get_one" }
];
const EditPromotion = ({ setEditScreen }: { setEditScreen: (value: boolean) => void }) => {
    // useEffect(()=>{
    //     setEditScreen(false);
    // },[])
    const { control, handleSubmit, formState: { } } = useForm<EditPromotionData>({ mode: "onBlur" });
    return (
        <CustomHeader>
            <ScrollView
                contentContainerStyle={{paddingBottom:50}}
            >
                <ThemedView style={styles.container}>
                    <CustomValidation
                        control={control}
                        name='title'
                        type='input'
                        placeholder={`Enter title`}
                        label={`Title`}
                    >
                    </CustomValidation>
                    <CustomValidation
                        control={control}
                        name='max_discount_amount'
                        type='input'
                        placeholder={`Enter max discount amount`}
                        label={`Max Discount Amount`}
                    >
                    </CustomValidation>
                    <CustomValidation
                        control={control}
                        name='discount_value'
                        type='input'
                        placeholder={`Enter discount value`}
                        label={`Discount Value`}
                    >
                    </CustomValidation>
                    <CustomValidation
                        control={control}
                        name='cashback_amount'
                        type='input'
                        placeholder={`Enter cashback amount`}
                        label={`Cashback Amount`}
                    >
                    </CustomValidation>
                    <CustomValidation
                        control={control}
                        name='min_order_amount'
                        type='input'
                        placeholder={`Enter min order amount`}
                        label={`Min Order Amount`}
                    >
                    </CustomValidation>
                    <CustomValidation
                        control={control}
                        name='usage_limit'
                        type='input'
                        placeholder={`Enter usage limit`}
                        label={`Usage Limit`}
                    ></CustomValidation>

                    <CustomValidation
                        data={pickerData}
                        type="picker"
                        hideStar
                        control={control}
                        name="option"
                        label={`Discount Type`}
                        placeholder="Select Option"
                        rules={{
                            required: {
                                value: true,
                                message: "Select Option",
                            },
                        }}
                    />
                    <CustomValidation
                        data={dicountType}
                        type="picker"
                        hideStar
                        control={control}
                        name="offer_type"
                        label={`Offer Type`}
                        placeholder="Select Option"
                        rules={{
                            required: {
                                value: true,
                                message: "Select Option",
                            },
                        }}
                    />

                    {/* <CustomButton
                    title={labels.login}
                    onPress={ }
                    isGradient
                /> */}

                </ThemedView>
            </ScrollView>
        </CustomHeader>
    );
};
const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
        marginHorizontal: ms(20),
    },
});
export default EditPromotion;