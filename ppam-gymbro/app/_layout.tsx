import { Slot } from "expo-router";
// import { useFonts } from 'expo-font';
import { RegisterProvider } from "@/provider/RegisterProvider";
import { Provider } from "react-native-paper";

export default function AppLayout(){
    return (
    
    <RegisterProvider>
        <Slot/>
    </RegisterProvider>
    
    )
    ;
}