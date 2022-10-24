import { Pressable, Text, View } from 'react-native';

/*

*/
//pass in value as a prop
export default function ButtonA(props) {
  return (
    <Pressable className= "rounded-full bg-indigo-500 h-10 w-20 items-center justify-center" >
        <Text>{props.name}</Text>
    </Pressable>
  );
}
