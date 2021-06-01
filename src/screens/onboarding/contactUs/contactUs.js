import React, { Component } from 'react';
import { View } from 'react-native'
import { Header, AppTextInput, AppButton, Loader } from '../../../components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import styles from './contactUs.styles'
import { emailValidation } from '../../../utils/regularExpression';
import { connect } from 'react-redux';
import { contactUs } from '../../../store/reducerActions/login/login.action';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
            fullName: "",
            message: "",
            errorText: "",
            isButtonDisabled: true,
            isLoading: false
        }
    }

    settextFieldValue(value, type) {
        this.setState(
            {[type]: value},
            () => this.validateTextField(value)
        )
    }

    validateTextField(val) {
        const { fullName, emailValue, message } = this.state
        if (emailValue != "" && fullName != "" && message != "" && val.length != 0) {
          if (!emailValidation(emailValue)) {
            this.setState({ isButtonDisabled: true })
          } else {
            this.setState({ isButtonDisabled: false })
          }
        } else {
          this.setState({ isButtonDisabled: true })
        }
    }

      
    buttonPressed() {
        const { contactUs, navigation } = this.props
        const { fullName, emailValue, message } = this.state

        this.setState({ isLoading: true })
        let data = {
            name: fullName,
            email: emailValue,
            enquiry: message
        }
        contactUs(data)
        .then(res => {
            console.log(res);
            this.setState({ isLoading: false })

            if(res.payload.data.status == 'ok'){
                navigation.goBack()
            }
        })
        .catch(e => this.setState({ isLoading: false })
        )
    }

    render() {
        const { fullName, emailValue, message, errorText, isButtonDisabled, isLoading } = this.state
        return (
            <>
                <Header back title={"Contact us"} />
                <Loader isLoading={isLoading}/>
                <KeyboardAvoidingScrollView style={styles.mainContainer}>
                    <View style={styles.content}>
                        <AppTextInput
                            onChange={(text) => { this.settextFieldValue(text, 'fullName') }}
                            value={fullName}
                            placeholderText={"Enter full name"}
                        />
                        <AppTextInput
                            onChange={(text) => { this.settextFieldValue(text, 'emailValue') }}
                            value={emailValue}
                            placeholderText={"Email address"}
                            type={'email-address'}
                            error={errorText}
                            onSubmit={() => {
                                if (!emailValidation(emailValue)) {
                                    this.setState({ errorText: "Please enter valid email Id." })
                                }
                            }}
                            onBlur={() => {
                                if (!emailValidation(emailValue) && emailValue.length > 0) {
                                    this.setState({ errorText: "Please enter valid email Id." })
                                }
                            }}
                        />
                        <AppTextInput
                            onChange={(text) => { this.settextFieldValue(text, 'message') }}
                            value={message}
                            placeholderText={"Enter your message"}
                        />
                        <AppButton type={"withoutContainer"} title={"Submit"} disable={isButtonDisabled} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer}/>
                    </View>
                </KeyboardAvoidingScrollView>
            </>
        )
    }
}
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    contactUs: (data) => dispatch(contactUs(data))
  });
  
  export default connect(null, mapDispatchToProps)(ContactUs);