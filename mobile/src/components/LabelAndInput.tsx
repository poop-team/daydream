import { TextInput, Text, View } from 'react-native';

interface Props {
    value: string;
    labelText: string;
    placeholder: string;
    secureTextEntry?: boolean;
    onChangeText: (value: string) => void;
}

export default function LabelAndInput({ value, labelText, placeholder, secureTextEntry, onChangeText }: Props){

    return (
      <>
        <Text className="mt-6 mb-3 font-bold text-xl">
          {labelText}
        </Text>

        <View className="mx-auto rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center">
          <TextInput
            className="ml-3 w-80"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#000000"
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}/>
        </View>
      </>
    )
}