import { Slot, Stack } from "expo-router";
// import { useFonts } from 'expo-font';

export default function AppLayout(){
    return <Stack
        screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
    }}/>;
}