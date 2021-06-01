import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Header, AppButton, Text12, Loader } from '../../../components';
import { Colors, Images, AppStyles } from '../../../theme';
import styles from './busBreakdown.styles'
import { breakdown } from '../../../store/reducerActions/busBreakdown/busBreakdown.actions';
import { connect } from 'react-redux';

class BusBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: {},
            isLoading: false
        }
    }

    buttonPressed() {
        const { breakdown, userId } = this.props
        const { selectedValue } = this.state

        this.setState({ isLoading: true })
        let data = {
            reason: selectedValue.title,
            reason_text: selectedValue.title,
            user_id: userId
        }
        breakdown(data)
            .then((res) => {
                this.setState({ isLoading: false })
                if (res.payload.data.status == "ok") {
                    setTimeout(() => {
                        alert(res.payload.data.message)
                    }, 200);
                    this.setState({ selectedValue: {} })
                } else {
                    setTimeout(() => {
                        alert("Something went wrong, Please try again after some time.")
                    }, 200);
                }
            })
            .catch(e => this.setState({ isLoading: false }))
    }

    render() {
        const { selectedValue, isLoading } = this.state
        return (
            <View style={styles.container}>
                <Header title={"Breakdown Reason"} />
                <Loader isLoading={isLoading} />
                <FlatList
                    data={[{ id: 1, title: "Leaked Tires" }, { id: 2, title: "Engine breakdown" }, { id: 3, title: "Empty fuel" }, { id: 4, title: "Other reason" }]}
                    keyExtractor={(item, index) => `${item.id.toString()}${index.toString()}`}
                    style={styles.listPadding}
                    ListFooterComponent={() => <AppButton type={"withoutContainer"} title={"Submit"} disable={!(selectedValue && selectedValue.id)} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer} />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={[styles.listContainer, AppStyles.shadow]} onPress={() => this.setState({ selectedValue: item })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={Images[item.title]} style={styles.issueImage} />
                                    <Text12 title={item.title} type="light" />
                                </View>
                                {(selectedValue && selectedValue.id == item.id) ? <Image source={Images.checkMark} style={styles.checkImage} /> :
                                    <View style={[styles.checkImage, styles.checkBox]} />}
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.loginReducer.user.id
});
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    breakdown: (data) => dispatch(breakdown(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BusBreakdown);