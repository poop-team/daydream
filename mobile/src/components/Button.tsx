import { Pressable, Text, View } from 'react-native';

/*

*/
//pass in value as a prop
export default function ButtonA(props) {
  return (
    <Pressable className= "rounded-full bg-indigo-500 h-7 items-center justify-center" >
        <Text className='text-white margin mx-5'>{props.name}</Text>
    </Pressable>
  );
}
