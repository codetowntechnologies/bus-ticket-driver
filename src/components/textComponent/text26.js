import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
const fontSize = Fonts.size.font26;

export default function Text26 (props) {
    const { title, type, addedStyle } = props
    return <Text style={[styles[type], { fontSize }, addedStyle]}>{title}</Text>
}

const styles = StyleSheet.create({
    bold: {
        color: Colors.black2b,
        fontFamily: Fonts.type.bold
    },
    regular: {
        color: Colors.black2b,
        fontFamily: Fonts.type.regular
    },
    light: {
        color: Colors.black2b,
        fontFamily: Fonts.type.light
    }
})