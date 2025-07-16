import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScaledSheet } from "react-native-size-matters";

const TrashedMeetingType = () => {
    return(
        <CustomHeader>
            <ThemedView>
                <ThemedText>
                    data 
                </ThemedText>
            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({

})
export default TrashedMeetingType;