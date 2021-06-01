import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { Header, AppButton, Text12 } from '../';
import { Colors, Images } from '../../theme';
import { wp, hp } from '../../utils/heightWidthRatio';

export default class SelectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: {},
            isButtonDisabled: true
        }
    }

    componentDidMount() {
        const { selectedData } = this.props
        if(selectedData && selectedData.id) {
            this.setState({ selectedValue: selectedData })
        }
    }

    buttonPressed() {
        const { buttonPressed } = this.props
        buttonPressed()
    }

    render() {
        const { selectedValue } = this.state
        const { header, data } = this.props
        return (
            <>
                <Header back title={header} />
                <FlatList 
                    data={data}
                    keyExtractor={(item, index) => `${item.cityName.toString()}${index.toString()}`}
                    style={styles.listPadding}
                    ListFooterComponent={() =>  <AppButton type={"withoutContainer"} title={"Submit"} disable={!(selectedValue && selectedValue.id)} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer}/>}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity style={styles.cityView} onPress={() => this.setState({ selectedValue: item })}>
                                <Text12 title={item.cityName} type="light"/>
                                {(selectedValue && selectedValue.id == item.id) ?<Image source={Images.checkMark} style={styles.checkImage}/> : null}
                            </TouchableOpacity>
                        )
                    }}
                />
            </>
        )
    }
}


const styles = StyleSheet.create({
    listPadding: {
        paddingHorizontal: 25
    },
    content: {
        flex: 1,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(50),
        marginHorizontal: wp(15)
    },
    cityView: { 
        height: 50, 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between'
    },
    checkImage: { 
        height: 20, 
        width: 20 
    }
})
