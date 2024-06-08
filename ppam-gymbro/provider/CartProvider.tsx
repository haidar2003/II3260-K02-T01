import { View, Text } from 'react-native'
import React, { useState, useContext, createContext, useEffect } from 'react'
import { useAuth } from './AuthProvider';
import { supabase } from '@/utils/supabase';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const {session,authLoading,userData,getSession,updateUserData}  = useAuth()
    const [cartList , setCartList] = useState([])
    const [index , setIndex] = useState(0)
    const addToCart = (newItem) => {
      const newItemadded = { ...newItem, id: index }
      setIndex(index + 1)
      setCartList( (prevItems) => [...prevItems, newItemadded] )
      console.log("CartProvider" ,newItemadded)
    }

    const removeFromCart = (id, type) => {
      if (type === "Online"){
      setCartList( (prevItems) => prevItems.map(item => item.id === id ? {...item , onlineBundle : 0} : item ) )
      }
      if (type === "Offline"){
        setCartList( (prevItems) => prevItems.map(item => item.id === id ? {...item , offlineBundle : 0} : item ) )
        }
      setCartList((prevItem) => prevItem.filter(item => (item.offlineBundle + item.onlineBundle) > 0))

      }

    const value = {
      cartList, addToCart, removeFromCart
    };

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart }