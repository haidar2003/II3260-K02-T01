import { View, Text } from 'react-native'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { supabase } from '@/utils/supabase';
import { useAuth } from './AuthProvider';

const CurrentTrainerContext = createContext(null);

const CurrentTrainerProvider = ({ children }) => {
  const [currentTrainerLoading, setCurrentTrainerLoading] = useState(false)
  const [activeTrainer, setActiveTrainer] = useState(null)
  const [nonActiveTrainer, setNonActiveTrainer] = useState(null)
  const [currentTrainer, setCurrentTrainer] = useState(null)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const {session,authLoading,userData,getSession,updateUserData}  = useAuth()

  const updateActiveTrainer = async () => {
    if (userData != null) {
        setCurrentTrainerLoading(true)
        const id_user_input = userData.id_user
        const {data : dataActiveTrainer , error : errorActiveTrainer } = await supabase
        .rpc('get_active_trainer',  {
          id_user_input
        })
        if (errorActiveTrainer) {
          console.log("failed to fetch active trainer", errorActiveTrainer)
          console.log(userData.id_user)
        } else {
          setActiveTrainer(dataActiveTrainer)
          setCurrentTrainer(dataActiveTrainer[0])
          setSelectedTrainer(dataActiveTrainer[0])
          console.log(dataActiveTrainer)
        }
        const {data : dataNonActiveTrainer , error : errorNonActiveTrainer } = await supabase
        .rpc('get_non_active_trainers', {id_user_input})
        if (errorNonActiveTrainer) {
          console.log("failed to fetch non-active trainer", errorNonActiveTrainer)
          console.log(userData.id_user)
        } else {
          setNonActiveTrainer(dataNonActiveTrainer)
          console.log("Non ACtive",dataNonActiveTrainer)
        }
        setCurrentTrainerLoading(false)
      }
    }
    
    const value = {
      activeTrainer, currentTrainer, currentTrainerLoading, updateActiveTrainer, setCurrentTrainer,nonActiveTrainer,selectedTrainer, setSelectedTrainer
    }
    
    useEffect(() => {updateActiveTrainer()}, [userData])
    return (
        <CurrentTrainerContext.Provider value = {value}>
            {children}
        </CurrentTrainerContext.Provider>
    )
}

const useCurrentTrainer = () => {
  const context = React.useContext(CurrentTrainerContext);
  if (!context) {
    throw new Error('useCurrentTrainer must be used within a CurrentTrainerProvider');
  }
  return context;
};

export { CurrentTrainerProvider, useCurrentTrainer }