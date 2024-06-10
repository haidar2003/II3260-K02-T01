import { View, Text } from 'react-native'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { useAuth } from './AuthProvider';
import { supabase } from '@/utils/supabase';

const WorkoutContext = createContext(null);

const WorkoutProvider = ({ children }) => {
    const {session,authLoading,userData,getSession,updateUserData}  = useAuth()
    const [workoutList , setWorkoutList] = useState(null)
    const [workoutLoading, setWorkoutLoading] = useState(false)
    const getWorkoutList = async () => { 
      if (userData != null) {
        
      
        setWorkoutLoading(true)
        const {data, error} = await supabase.from("Workout_Plan").select("*").eq("id_user", userData.id_user)
        if (error) {
            console.log("get workout failed", error)
        } else {
            setWorkoutList(data)
        }
        setWorkoutLoading(false)
    }
    }
    useEffect(() => {
        getWorkoutList()
    }, [userData])

    const value = {
        workoutList, getWorkoutList, workoutLoading
    };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

const useWorkout = () => {
  const context = React.useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export { WorkoutProvider, useWorkout }