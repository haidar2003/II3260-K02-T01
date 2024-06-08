import { CartProvider } from "@/provider/CartProvider";
import { Slot, Stack } from "expo-router";
// import { useFonts } from 'expo-font';

export default function AppLayout(){
    return (  
        <Stack
        screenOptions={{headerShown: false,}}/>
         );
}