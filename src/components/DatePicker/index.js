import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

/**
 * A reusable date picker component for selecting dates.
 * @param {Object} props - The properties for the DatePicker component.
 * @param {Date} props.date - The selected date value.
 * @param {'outlined' | 'flat'} props.mode - The mode for the date picker input field.
 * @param {string} props.label - The label to display for the input field.
 * @param {Object} props.validRange - An object containing valid date range information.
 * @param {Date} props.validRange.startDate - The minimum selectable date.
 * @param {Date} props.validRange.endDate - The maximum selectable date.
 * @param {function} props.onConfirm - A callback function to handle the selected date.
 * @param {Boolean} props.error - If True, sets the error theme to the input
 */
function DatePicker({ date, mode, label, validRange, onConfirm, error }) {
    // Determine if the current date is in the past or future of the valid date range.
    const isPast = validRange?.endDate && Date.now() > validRange?.endDate;
    const isFuture = validRange?.startDate && Date.now() < validRange?.startDate;

    // Initialize the initial date value based on the provided date, valid range, and current time.
    const initialDate = date
        ? new Date(date)
        : isPast
        ? validRange?.endDate
        : isFuture
        ? validRange?.startDate
        : new Date();

    // State to control the visibility of the date and time picker modal.
    const [showPicker, setShowPicker] = useState(false);

    // Callback function to handle date and time confirmation.
    const handleConfirm = (date) => {
        setShowPicker(false);
        onConfirm(date);
    };

    // Callback function to handle date and time picker dismissal.
    const handleDismiss = () => {
        setShowPicker(false);
    };

    return (
        <>
            <View style={{ position: "relative" }}>
                {/* Text input field for displaying and selecting the date. */}
                <TextInput
                    mode={mode}
                    label={label}
                    placeholder={label}
                    value={date?.toLocaleDateString()}
                    right={<TextInput.Icon icon="calendar-account" />}
                    error={error}
                />

                {/* Touchable opacity component to open the date and time picker. */}
                <TouchableOpacity
                    onPress={() => {
                        setShowPicker(true);
                    }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1000,
                    }}
                />
            </View>

            {/* Date picker modal component. */}
            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleDismiss}
                date={initialDate}
                minimumDate={validRange?.startDate}
                maximumDate={validRange?.endDate}
            />
        </>
    );
}

export default DatePicker;
