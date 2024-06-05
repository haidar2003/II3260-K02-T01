import { View, Text } from 'react-native'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { supabase } from '@/utils/supabase';
import { useAuth } from './AuthProvider';

const CurrentTrainerContext = createContext(null);

const CurrentTrainerProvider = ({ children }) => {
  const [currentTrainerLoading, setCurrentTrainerLoading] = useState(false)
  const [activeTrainer, setActiveTrainer] = useState(null)
  const [currentTrainer, setCurrentTrainer] = useState(null)
  const [currentTrainerSession , setCurrentTrainerSession ] = useState(0)
  const {session,authLoading,userData,getSession,updateUserData}  = useAuth()
  const updateActiveTrainer = async () => {
      setCurrentTrainerLoading(true)
      const {data : activeTrainerData, error : activeTrainerError} = await supabase
      .from('session')
      .select('id_trainer')
      .eq('id_user', userData.id_user)
      .eq('isFinished', 'False');
      if (activeTrainerError) {
        console.log(activeTrainerError)
        setCurrentTrainerLoading(false)
      } else {
        const activeTrainer = activeTrainerData.map(session => session.id_trainer);
        const {data, error} = await supabase.from("Trainer").select("*").in("trainer_id" ,activeTrainer)
        if (error) {
          console.log(error)
          setCurrentTrainerLoading(false)
        } else {
          setActiveTrainer(data)
          if (data.length > 0) {
            setCurrentTrainer(data[0])
          }
          setCurrentTrainerLoading(false)
        }
      }
    }
    const updateCurrentTrainer = async () => {
      
      const {count , error} = await supabase.from("session").select("*", {count : "exact", head : true}).eq("id_user", userData.id_user).eq("trainer_id", currentTrainer.trainer_id)
      if (error) {
        console.log("get Current Trainer Session Error ", error)
      } else {
        setCurrentTrainerSession(count)
      }
    }
    
    const value = {
      activeTrainer, currentTrainer, currentTrainerLoading, updateActiveTrainer, setCurrentTrainer, currentTrainerSession
    }
    useEffect(() => {updateCurrentTrainer()} , [currentTrainer])
    return (
        <CurrentTrainerContext.Provider value = {value}>
            {children}
        </CurrentTrainerContext.Provider>
    )
}

const useCurrentTrainer = () => {
  const context = React.useContext(CurrentTrainerContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { CurrentTrainerProvider, useCurrentTrainer }