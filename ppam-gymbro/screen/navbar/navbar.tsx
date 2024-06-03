import { StyleSheet, View, Animated, Image, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Tabs, Redirect, Link, router, useNavigation } from "expo-router";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHome, faUsers, faBolt, faMessage, faSearch} from '@fortawesome/free-solid-svg-icons'

const { width, height } = Dimensions.get('window');

export default function NavBar() {

    return (
        <Tabs 
        initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor : "#FF5200",
            tabBarInactiveTintColor : "gray",
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Tabs.Screen
            name='find_Trainer'
            options={{
                href : "/find_Trainer",
                tabBarIcon : ({color}) => (
                    <FontAwesomeIcon icon={faSearch} style={{color : color, width : 24, height : 24} as any}/>
                )
            }} />
            <Tabs.Screen
            name='active_Trainer'
            options={{
                href : "/active_Trainer",
                tabBarIcon : ({color}) => (
                    <FontAwesomeIcon icon={faUsers} style={{color : color, width : 24, height : 24} as any}/>
                )
            }} />
            <Tabs.Screen
            name='home'
            options={{
                href : "/home",
                tabBarIcon : ({color}) => (
                    <FontAwesomeIcon icon={faHome} style={{color : color, width : 24, height : 24} as any}/>
                )
            }} />
            <Tabs.Screen
            name='workout'
            options={{
                headerShown: false,
                href : "/workout",
                tabBarIcon : ({color}) => (
                    <FontAwesomeIcon icon={faBolt} style={{color : color, width : 24, height : 24} as any}/>
                )
            }} />
        </Tabs>
    )

}