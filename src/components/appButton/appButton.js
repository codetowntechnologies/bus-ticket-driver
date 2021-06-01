import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { hp } from '../../utils/heightWidthRatio'

/*@params
// type - withoutContainer / borderContainer
*/
export default function AppButton (props) {
    const {title, buttonPressed, type, containerStyle, disable} = props
    return (
        <TouchableOpacity disabled={(disable)? disable: false} onPress={()=>{(buttonPressed) && buttonPressed()}} style={[styles[type], (disable) && styles.disableColor, containerStyle]}>
            <Text style={styles[type+'Text']}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    borderContainerText: {
        fontSize: Fonts.size.font10,
        color: Colors.black2b,
        textAlign: 'center',
        fontFamily: Fonts.type.light
    },
    disableColor:{
        backgroundColor: Colors.greyAc,
    },
    withoutContainerText: {
        fontSize: Fonts.size.font16,
        color: Colors.whiteFF,
        textAlign: 'center',
        fontFamily: Fonts.type.bold
    },
    borderContainer:{
        marginTop: heightPercentageToDP(4.35),
        height: hp(60),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteFF,
        borderColor: Colors.greyEb,
        borderTopWidth: 2,
        bottom: 0,
    },
    withoutContainer:{
        marginTop: heightPercentageToDP(4.35),
        height: hp(40),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.yellowF6,
        borderRadius: 4
    }
})