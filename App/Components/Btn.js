import React from "react";
import { TouchableOpacity, Text } from "react-native";


export default function Btn({ bgColor, btnLabel, textColor, Press }) {
    return (
        <TouchableOpacity 
            onPress={Press}
            style={{ 
                backgroundColor: bgColor, 
                borderRadius: 100, 
                alignItems: 'center', 
                width: 300,
                paddingVertical: 10,
                marginVertical: 10
                
            }}>
            <Text 
                style={{ 
                    color: textColor, 
                    fontSize: 25, 
                    fontWeight: 'bold' 
                }}> 
                
                {btnLabel} 

            </Text>
        </TouchableOpacity>
    )
}