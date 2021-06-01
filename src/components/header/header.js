import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native'
import { Images, Colors, AppStyles } from '../../theme'
import { useNavigation } from '@react-navigation/native';
import { Text16, Text14 } from '../';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info'


export default function Header({ title, back, isRefreshEnabled, onRefresh, description }) {
    const refreshButton = () => {
        if (!onRefresh) return
        return (
            <TouchableOpacity disabled={!isRefreshEnabled} onPress={() => onRefresh()} style={styles.refreshButton}>
                <Image source={isRefreshEnabled ? Images.refresh : Images.refreshDisable} style={styles.refreshImage} resizeMode={'contain'} />
            </TouchableOpacity>
        )
    }
    const backButton = () => {
        const navigation = useNavigation();
        return (
            <View style={styles.backViewContainer}>
                <View style={description ? styles.backViewWithDesc : styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={Images.back} style={styles.backImage} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View>
                        <Text14 title={title} type={"regularWhite"} />
                        {description ? <Text14 title={description} /> : null}
                    </View>
                </View>
                {refreshButton()}
            </View>
        )
    }

    let containerStyle = back ? {} : { paddingLeft: AppStyles.marginHorizontal }
    return (
        <View style={[styles.container, containerStyle, AppStyles.shadow2]}>
            {back ? backButton() : <Text14 title={title} type={"regularWhite"} />}
            {/* {!back ? <Image source={Images.nacoLogo} style={styles.nacoLogo} resizeMode={'contain'} /> : null} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS == 'ios') ? DeviceInfo.hasNotch() ? 78 + 30 : heightPercentageToDP(9.7) + 15 : 78,
        backgroundColor: Colors.green27,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingRight: AppStyles.marginHorizontal,
        paddingBottom: heightPercentageToDP(1.7),
        paddingTop: (Platform.OS == 'ios') ? DeviceInfo.hasNotch() ? 30 : 15 : 0
    },
    nacoLogo: {
        height: heightPercentageToDP(4.3),
        width: widthPercentageToDP(11.7)
    },
    backImage: {
        height: heightPercentageToDP(1.4),
        width: widthPercentageToDP(5.3)
    },
    backButton: {
        paddingRight: AppStyles.horizontal10,
        paddingLeft: AppStyles.marginHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP(5)
    },
    backView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backViewWithDesc: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    backViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    refreshButton: {
        paddingLeft: AppStyles.marginHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP(5),
    },
    refreshImage: {
        height: widthPercentageToDP(4.8),
        width: widthPercentageToDP(4.8)
    },
})