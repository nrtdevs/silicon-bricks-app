import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import { ThemedView } from "@/components/ThemedView";
import { useForm } from "react-hook-form";
import { ms, ScaledSheet, vs } from 'react-native-size-matters';

interface AddPromotionData {
    title: string;
    discount_value: string;
    option: string;
    max_discount_amount: string;
    dicuunt_value : string;
    cashback_amount : string;
    min_order_amount : string;
    usage_limit : string;
    discription : string;
    start_date : string;
    end_date : string;
    status : string;
    offer_type : string;
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
const AddPromotion = () => {
    const { control, handleSubmit, formState: { } } = useForm<AddPromotionData>({ mode: "onBlur" });
    return (
        <CustomHeader>
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
                    onPress={}
                    isGradient
                /> */}

            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
        marginHorizontal: ms(20),
    },
});
export default AddPromotion;