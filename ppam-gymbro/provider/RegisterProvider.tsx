import { View, Text } from 'react-native'
import React, { useState, useContext, createContext } from 'react'
import RegisterClass from "@/utils/registerClass"

const RegisterContext = createContext(null);

const RegisterProvider = ({ children }) => {
    const [register, setRegister] = useState(null);

    const setUsernameAndEmail = (username: string, email: string): void =>  {
        const tempRegister = new RegisterClass(username, email);
        setRegister(tempRegister);
    }


    const setPassword = (password: string) => {
        const tempRegister = new RegisterClass(register.username, register.email, password);
        setRegister(tempRegister)
    }
    const value = {
        register,
        setUsernameAndEmail, setPassword
    };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
}

const useRegister = () => {
  const context = React.useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister must be used within a RegisterProvider');
  }
  return context;
};

export { RegisterProvider, useRegister }