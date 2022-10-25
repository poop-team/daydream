import { Pressable, Text, View } from 'react-native';
/**
* name - name of the button.
* addButtonStyle - add custom style to the button.
* addTextStyle - add custom style to the text.
* pilled - make the button pilled.
**/
export default function Buttons({
  name, 
  addButtonStyle, 
  addTextStyle, 
  disabled = false, 
  pilled = false}
  ){

  let baseStyle = 'h-7 items-center justify-center';
  let textStyle = 'text-white margin mx-5 font-semibold';

  if (disabled) {
    baseStyle += ' text-slate-50 bg-indigo-900/40 hover:bg-indigo-900/80';
  }
  //default style
  else{
    baseStyle += ' text-slate-50 bg-indigo-900 hover:bg-indigo-800 active:opacity-70';
  }
  if(pilled){
    baseStyle += ' rounded-full';
  }
  else{
    baseStyle += ' rounded-md';
  }

  return (
    <Pressable className={`${baseStyle} ${addButtonStyle}`} >
        <Text className = {`${textStyle} ${addTextStyle}`}>{name}</Text>
    </Pressable>
  );
}

