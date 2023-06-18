import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import firebase from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/actions';
import { API } from '../constants/GlobalAPI';
import axios from 'axios';

const SERVER_STATE = API.CURRENT_STATE

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username && password) {
        if (/^[a-zA-Z0-9-'@,.']+$/.test(username) && username.length > 5 && password.length > 7) {
          
        } else {
          setValidationError('Invalid username or password');
        }
    } else {
      setValidationError('Please enter your username and password');
    }

    try {
      let baseUrl = API[SERVER_STATE]+API.USER.login;
      console.log(baseUrl)
      await axios.post(baseUrl, {
        user_id: username,
        password: password,
      }).then(res => {
        console.log('-----------res-data', res.data);
        dispatch(setAuthUser(res.data));
        navigation.push('HomeScreen')
      }).catch(error => console.log(error));
      // Handle the response from the server
      // e.g., store the authentication token in AsyncStorage, navigate to the main app screen, etc.
    } catch (error) {
      console.log('catch block', error)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png'}} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Phone number, username, or email"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      {validationError ? (
        <Text style={styles.validationError}>{validationError}</Text>
      ) : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your login details? Get help signing in.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.orLine}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine}></View>
      </View>
      <TouchableOpacity style={styles.facebookLoginButton}>
        <Text style={styles.facebookLoginButtonText}>Log in with Facebook</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign up.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10
  },
  validationError: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0095f6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
},
forgotPasswordText: {
color: '#003569',
fontSize: 14,
fontWeight: 'bold'
},
orContainer: {
width: '100%',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
marginVertical: 10
},
orLine: {
width: '40%',
height: 1,
backgroundColor: '#DBDBDB'
},
orText: {
color: '#8E8E8E',
fontSize: 14,
marginHorizontal: 10
},
facebookLoginButton: {
width: '100%',
height: 50,
backgroundColor: '#3B5998',
borderRadius: 5,
alignItems: 'center',
justifyContent: 'center',
marginBottom: 10
},
facebookLoginButtonText: {
color: '#FFF',
fontSize: 16,
fontWeight: 'bold'
},
signupContainer: {
width: '100%',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center'
},
signupText: {
color: '#8E8E8E',
fontSize: 14
},
signupLink: {
color: '#003569',
fontSize: 14
}
});

export default LoginScreen;