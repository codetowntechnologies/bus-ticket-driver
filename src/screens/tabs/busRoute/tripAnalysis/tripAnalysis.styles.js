import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../../utils/heightWidthRatio';
import { Colors, AppStyles } from '../../../../theme';

export default styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    headerView: {
        backgroundColor: Colors.green27,
        height: hp(200)
    },
    headerContainer: {
        paddingHorizontal: wp(25),
        flexDirection: 'column',
        position: 'absolute',
        top: 20,
        width: '100%'
    },
    backButton: {
        height: wp(40),
        width: wp(40),
        borderRadius: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        height: 14,
        width: 18
    },
    emptyView: {
        height: wp(40),
        width: wp(40)
    },
    mapContainer: {
        flex: 1
    },
    startTripBtn: {
        height: hp(45),
        backgroundColor: Colors.blue57,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(15),
        width: '100%',
        marginTop: hp(20)
    },
    tiltArrow: {
        height: 13,
        width: 12,
        marginRight: wp(20)
    },

    bottomContainer: {
        backgroundColor: Colors.whiteFF,
        flex: 1,
        paddingHorizontal: wp(23),
        alignItems: 'center'
    },
    routeDetail: {
        backgroundColor: Colors.whiteFF,
        width: '100%',
        paddingVertical: hp(20),
        paddingHorizontal: wp(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(-30),
        flexWrap: 'wrap'
    },
    busNumberView: {
        height: wp(30),
        width: wp(30),
        borderRadius: wp(15),
        backgroundColor: Colors.brownE1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(10)
    },
    startTime: { 
        color: Colors.brownE1, 
        marginTop: 5 
    },
    stepIndicator0: { 
        height: 30, 
        width: 30, 
        backgroundColor: Colors.brownE1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    innerIndicatorView: { 
        height: 40, 
        width: 40, 
        backgroundColor: Colors.brownE1 
    },
    stepIndicator: { 
        height: 30, 
        width: 30,
        backgroundColor: Colors.brownE1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})