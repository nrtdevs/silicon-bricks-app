import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScaledSheet } from "react-native-size-matters";

const ExitingMeeting = () => {
    return (
        <CustomHeader
            title="Exiting Meeting"
            showBackButton={true}
            showRightButton={false}>
            <ThemedView style={styles.container}>
                <ThemedView>
                    <ThemedText style={{color: "#333" }}>
                        You are exiting the meeting...
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding : "12@s",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0"
    },
    text: {
        fontSize: "16@s",
        color: "#333"
    },
    cardTyles : {
        
    }
})
export default ExitingMeeting;