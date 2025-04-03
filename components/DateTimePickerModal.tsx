import React from "react";
import { Image, StyleSheet, Platform, useColorScheme } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { Overlay } from "@rneui/themed";
import { ms } from "react-native-size-matters";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";

const DateTimePickerModal = ({
    dateTimePickerProps,
    onDateTimeSelection,
    setDateTimePickerProps,
}: {
    dateTimePickerProps: any;
    onDateTimeSelection: any;
    setDateTimePickerProps: any;
}) => {
    const colorScheme = useColorScheme();
    if (!dateTimePickerProps?.visible) return null;

    return Platform.OS == "android" ? (
        <DateTimePicker
            value={dateTimePickerProps?.value || new Date()}
            mode={dateTimePickerProps?.mode}
            display={dateTimePickerProps?.display}
            is24Hour={dateTimePickerProps?.is24Hour}
            onChange={onDateTimeSelection}
        />
    ) : Platform.OS == "ios" ? (
        <Overlay
            backdropStyle={{}}
            overlayStyle={{
                borderRadius: ms(20),
                minWidth: "90%",
                minHeight: "50%",
                backgroundColor: Colors.white,
                alignItems: "center",
                justifyContent: "center",
            }}
            isVisible={true}
            onBackdropPress={() => {
                setDateTimePickerProps(getDateTimePickerProps(false));
            }}
        >
            <DateTimePicker
                value={dateTimePickerProps?.value || new Date()}
                mode={dateTimePickerProps?.mode}
                display={dateTimePickerProps?.display}
                is24Hour={dateTimePickerProps?.is24Hour}
                onChange={onDateTimeSelection}
                textColor={colorScheme === "dark" ? Colors.white : Colors.black}
                themeVariant={colorScheme === "dark" ? "dark" : "light"}
                accentColor={colorScheme === "dark" ? Colors.white : Colors.black}

            />
        </Overlay>
    ) : null;
};

export default DateTimePickerModal;
