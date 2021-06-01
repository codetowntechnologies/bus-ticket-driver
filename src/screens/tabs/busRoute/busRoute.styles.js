import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../utils/heightWidthRatio';
import { Colors, AppStyles } from '../../../theme';

export default styles = StyleSheet.create({
    mainContainer: { 
        backgroundColor: Colors.whiteFF, 
        flex: 1 
    },
    headerView: { 
        backgroundColor: Colors.green27, 
        height: hp(220) 
    },
    headerContainer: { 
        flex: 1, 
        paddingTop: hp(20), 
        marginBottom: hp(30),
    },
    cityName: { 
        color: Colors.whiteFF, 
        right: wp(24), 
        position: 'absolute', 
        top: hp(30) 
    },
    logoView: { 
        width: '100%', 
        alignItems: 'center' 
    },
    logo: { 
        height: hp(45),
        width: wp(85),
        marginHorizontal: wp(40), 
    },
    locationView: { 
        backgroundColor: Colors.whiteFF, 
        flex: 1, 
        marginHorizontal: wp(40), 
        borderRadius: 3, 
        marginTop: hp(10), 
        padding: wp(10) 
    },
    fromLocView: { 
        flexDirection: 'row' 
    },
    locationIcon:{ 
        height: hp(11), 
        width: wp(8), 
        marginRight: wp(10) 
    },
    toLocView: { 
        flexDirection: 'row', 
        marginTop: hp(3) 
    },
    seperator: { 
        height: 1, 
        backgroundColor: Colors.greyCb, 
        marginVertical: hp(5) 
    },
    timeView: { 
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    startTimeView: { 
        marginRight: 20 
    },
    timeTitle: { 
        color: Colors.greyCb, 
        marginBottom: 2 
    },
    mapContainer: { 
        flex: 1 
    },
    startTripBtn: { 
        height: hp(45), 
        backgroundColor: Colors.yellowF6, 
        marginHorizontal: wp(40), 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: wp(15), 
        top: wp(-22), 
        position: 'absolute', 
        width: AppStyles.screenWidth - wp(79) 
    },
    tiltArrow: { 
        height: 13,
        width: 12
    }
})