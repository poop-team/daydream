import { Ref, useRef, useState } from "react";
import { TextInput, View, Pressable, TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styled } from 'nativewind';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  focusedColor?: string;
  unfocusedColor?: string;
}

const StyledView = styled(View);

export default ({
  value,
  onChangeText,
  focusedColor = "bg-indigo-200",
  unfocusedColor = "bg-slate-300",
  ...props
}: Props) => {
  const inputRef: Ref<TextInput> = useRef();

  const [isFocused, setFocused] = useState(false);

  const bgColor = isFocused ? focusedColor : unfocusedColor;
  const iosStyle = "mt-16 mx-4 top-9";
  const androidStyle = "mx-4 top-9"; 

  return (
    <StyledView className={`
      ios: ${iosStyle} 
      android: ${androidStyle}`}>
      <View className={`${bgColor} w-full flex-row items-center rounded-lg`}>
        <Pressable onPress={() => inputRef.current.focus()}>
          <View className={`${bgColor} mx-2`}>
            <Icon size={20} name="search-outline" />
          </View>
        </Pressable>
        <TextInput
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${bgColor} py-1 rounded-r-lg flex-1`}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {isFocused && (
          <Pressable onPress={() => onChangeText("")}>
            <View className={`${bgColor} mx-2`}>
              <Icon size={28} name="close-outline" />
            </View>
          </Pressable>
        )}
      </View>
    </StyledView>
  );
};
