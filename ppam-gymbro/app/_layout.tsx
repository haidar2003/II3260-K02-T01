import { Slot } from "expo-router";
// import { useFonts } from 'expo-font';
import { RegisterProvider } from "@/provider/RegisterProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import { CurrentTrainerProvider } from "@/provider/CurrentTrainerProvider";
import { CartProvider } from "@/provider/CartProvider";
import { WorkoutProvider } from "@/provider/WorkoutProvider";
export default function AppLayout(){
    return (
    <AuthProvider>
        <CurrentTrainerProvider>
            <RegisterProvider>
                <CartProvider>
                <WorkoutProvider>
                <Slot/>
                </WorkoutProvider>
                </CartProvider>
            </RegisterProvider>
        </CurrentTrainerProvider>
    </AuthProvider>
    )
    ;
}