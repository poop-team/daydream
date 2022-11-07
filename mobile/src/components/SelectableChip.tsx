import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from "nativewind";

interface Props {
    label: string;
    selected: boolean;
    onSelect: (style: string, selected: boolean) => void;
    style?: StyleProp<ViewStyle>;
}

function SelectableChip({
    label,
    selected,
    onSelect,
    style,
}: Props) {
    //# region handlers

    const handlePress = () => {
        onSelect(label, !selected);
    };

    //# endregion

    //# region styles

    let styles = 
        "flex-row px-4 py-2 sm:px-8 sm:py-4 items-center justify-center rounded-full";
    styles += selected
        ? " text-slate-50 bg-indigo-900"
        : " bg-slate-200 text-slate-900";

    //# endregion

    return (
        <Pressable className={styles} style={style} onPress={handlePress}>
            <Text className={`${selected ? "text-white" : "text-black"} margin mx-2 text-xl font-semibold`}>{label}</Text>
            <Ionicons className="inline-block h-full w-5" name={selected ? "checkmark" : "add"} size={27} color={selected ? "white" : "black"} />
        </Pressable>
    )
}

export default styled(SelectableChip);