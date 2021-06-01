import { StyleSheet } from 'react-native'
import { Colors } from '../../../theme'
import { hp, wp } from '../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: { 
        backgroundColor: Colors.whiteFF, 
        flex: 1 
    },
    listPadding: {
    },
    content: {
        flex: 1,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(50)
    },
    listContainer: { 
        height: hp(60), 
        alignItems: 'center', 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between',
        marginTop: hp(20),
        backgroundColor: Colors.whiteFF,
        paddingHorizontal: wp(15),
        marginHorizontal: wp(25)
    },
    checkImage: { 
        height: wp(20), 
        width: wp(20)
    },
    issueImage: { 
        height: wp(30), 
        width: wp(30),
        marginRight: wp(12)
    },
    buttonContainer: {
        marginHorizontal: wp(40),
        marginTop: hp(90)
    },
    checkBox: { 
        backgroundColor: Colors.green27, 
        borderRadius: 4 
    }
})