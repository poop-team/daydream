import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
    label: string;
    selected: boolean;
    onSelect: (style: string, selected: boolean) => void;
    className?: string;
}

export default function SelectableChip({
    label,
    selected,
    onSelect,
    className = "",
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
        <Pressable className={`${styles} ${className}`} onPress={handlePress}>
            {selected ? (
                <>
                    <Text className=" text-white margin mx-2 text-xl font-semibold">{label}</Text>
                    <Ionicons className="inline-block h-full w-5" name="checkmark" size={27} color="white" />
                </>
            ) : (
                <>
                    <Text className=" text-black margin mx-2 text-xl font-semibold">{label}</Text>
                    <Ionicons className="inline-block h-full w-5" name="add" size={27} color="black" />
                </>
            )}
        </Pressable>
    )
}