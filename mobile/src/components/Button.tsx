import { Pressable, Text, View } from 'react-native';

function ButtonPill(props) {
  return (
    <Pressable className= "rounded-full bg-[#2D1C70] opacity-90 h-7 items-center justify-center" >
        <Text className='text-white margin mx-5'>{props.name}</Text>
    </Pressable>
  );
}

export { ButtonPill };