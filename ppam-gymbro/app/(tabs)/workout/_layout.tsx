import { WorkoutProvider } from "@/provider/WorkoutProvider";
import { Slot, Stack } from "expo-router";
// import { useFonts } from 'expo-font';

export default function AppLayout(){
    
    return (
    <WorkoutProvider>
    <Stack
    screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
    }}
    />
    </WorkoutProvider>)
}