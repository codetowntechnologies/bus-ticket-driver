import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { Text16, Text12, CustomSafeArea } from '../../../components';
import { Images } from '../../../theme';
import styles from './more.styles'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
// madhurendra@paisabazaar.com
    resetStack = (whichStack) => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: whichStack }],
            }),
        );
    };

    buttonPressed(navScreen) {
        const { navigation } = this.props
        if (navScreen == "log out") {
            AsyncStorage.removeItem('USER');
            this.resetStack('onboardingStack')
            return
        }
        navigation.navigate(navScreen)
    }

    renderButton(image, title) {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.buttonPressed(title.toLowerCase())}>
                <View style={styles.leftView}>
                    <Image source={image} resizeMode='center' />
                    <Text12 title={title} type="light" />
                </View>
                {
                    title == "Inbox" ?
                        <View style={styles.notificationView}>
                            <Text style={styles.newTxt}>NEW</Text>
                        </View>
                        : null
                }
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation, user } = this.props
        const { email, firstname, lastname } = user

        return (
            <View style={styles.container}>
                <CustomSafeArea />
                <View style={styles.content}>
                    <TouchableOpacity style={styles.acInfoView} onPress={() => navigation.navigate("editAccount", { user  })}>
                        <Image source={Images.userIcon} style={styles.userInfoImg} />
                        <View>
                            <Text16 title={firstname + " " + lastname} type="regular" />
                            <Text12 title={email} type="lightGrey" addStyle={styles.emailTxt} />
                        </View>
                    </TouchableOpacity>
                    {this.renderButton(Images.inbox, "Inbox")}
                    {this.renderButton(Images.setting, "Setting")}
                    {this.renderButton(Images.logout, "Log out")}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.user
});
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(More);