import { Slot } from "expo-router";
// import { useFonts } from 'expo-font';
import { RegisterProvider } from "@/provider/RegisterProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import { CurrentTrainerProvider } from "@/provider/CurrentTrainerProvider";
export default function AppLayout(){
    return (
    <AuthProvider>
        <CurrentTrainerProvider>
            <RegisterProvider>
                <Slot/>
            </RegisterProvider>
        </CurrentTrainerProvider>
    </AuthProvider>
    )
    ;
}