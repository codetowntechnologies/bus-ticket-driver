import React, { Component } from 'react';
import { View, Image, Keyboard, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Images } from '../../../theme';
import styles from './styles';
import { AppTextInput, LinkText, AppButton, Text12, Header, Loader } from '.././../../components/index';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { emailValidation } from '../../../utils/regularExpression';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../../../store/reducerActions/login/login.action'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      passowrdValue: '',
      emailValue: '',
      toolTipVisible: false,
      modalVisible: false,
      isLoginDisabled: true,
      roleModalVisible: false,
      errorText: "",
      passwordTextInput: null,
      secureEntry: true,
      isLoading: false
    };
  }

  loginButtonPressed() {
    const { login } = this.props
    const { emailValue, passowrdValue } = this.state

    this.setState({ isLoading: true })
    var data = {
      type: "Driver",
      email: emailValue,
      password: passowrdValue
    }

    login(data)
      .then((res) => {
        this.setState({ isLoading: false })
        console.log('res', res);
        if (res.payload.data.status.toLowerCase() == "ok") {
          AsyncStorage.setItem('USER', JSON.stringify(res.payload.data.data));
          this.resetStack('tabbar');
        }
      })
      .catch(error => {
        this.setState({ isLoading: false })
        setTimeout(() => {
          alert("Something went wrong, please check your email and password and try again later")
        }, 300);
      })

  }

  settextFieldValue(val, type) {
    const { emailValue, passowrdValue } = this.state
    let str = val.trim()
    if (type == "Email") {
      this.setState({ emailValue: str, errorText: "" })
    } else {
      this.setState({ passowrdValue: str })
    }
    setTimeout(() => {
      this.validateTextField(val)
    }, 100);
    if (emailValue.length != 0 && passowrdValue.length != 0 && str.length != 0) {
      this.setState({ errorMessage: "" })
    }
  }

  validateTextField(val) {
    const { emailValue, passowrdValue } = this.state
    if (emailValue != "" && passowrdValue != "" && val.length != 0) {
      if (!emailValidation(emailValue)) {
        this.setState({ isLoginDisabled: true })
      } else {
        this.setState({ isLoginDisabled: false })
      }
    } else {
      this.setState({ isLoginDisabled: true })
    }
  }

  resetStack = (whichStack) => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: whichStack }],
      }),
    );
  };


  render() {
    const { isLoginDisabled, secureEntry, isLoading } = this.state
    const { navigation } = this.props

    return (
      <>
        <Header title={"Welcome to BUSTIKET Driver"} />
        <Loader isLoading={isLoading} />
        <View style={styles.mainContainer}>
          <KeyboardAvoidingScrollView scrollEnabled={false} style={styles.content}>
            <AppTextInput
              onChange={(text) => { this.settextFieldValue(text, 'Email') }}
              value={this.state.emailValue}
              placeholderText={"Email address"}
              type={'email-address'}
              error={this.state.errorText}
              onSubmit={() => {
                if (!emailValidation(this.state.emailValue)) {
                  this.setState({ errorText: "Please enter valid email Id." })
                  this.passwordTextInput.focus();
                } else {
                  this.passwordTextInput.focus();
                }
              }}
              onBlur={() => {
                if (!emailValidation(this.state.emailValue) && this.state.emailValue.length > 0) {
                  this.setState({ errorText: "Please enter valid email Id." })
                }
              }}
            />
            <AppTextInput
              refName={(input) => { this.passwordTextInput = input; }}
              onChange={(text) => { this.settextFieldValue(text, 'Password') }}
              iconImageRight={secureEntry ? Images.passwordDisabled : Images.eyeIcon}
              secure={secureEntry}
              onSubmit={() => { Keyboard.dismiss() }}
              containerStyle={{ marginTop: (Platform.OS == 'android') ? 10 : 30 }}
              value={this.state.passowrdValue}
              placeholderText={"Password"}
              rightAction={() => { this.setState({ secureEntry: !secureEntry }) }}
            />
            <AppButton type={"withoutContainer"} title={"Login"} disable={isLoginDisabled} buttonPressed={() => this.loginButtonPressed()} />
            <View style={styles.registerTextContainer}>
              <Text12 title={"Want to join? "} type={'light'} />
              <LinkText title={"Contact us"} containerStyle={styles.linkContainer} linkPressed={() => navigation.navigate('contactUs')} />
            </View>
          </KeyboardAvoidingScrollView>
          <AppButton type={"borderContainer"} title={"Forgot password"} buttonPressed={() => navigation.navigate('forgotPassword')} />
        </View>
      </>
    );
  }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data))
});

export default connect(null, mapDispatchToProps)(Login);