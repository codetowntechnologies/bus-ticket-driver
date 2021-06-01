import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../../theme';
import { wp, hp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteFF,
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(35),
        paddingTop: hp(80),
        backgroundColor: Colors.whiteFF
    },
    registerTextContainer: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        marginTop: heightPercentageToDP(4.2),
        flex: 1
    },
    linkContainer: {
        marginTop: 0,
        alignSelf: 'flex-start',
        marginRight: 0
    }
})

export default styles;