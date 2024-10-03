import { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button } from "react-native";
import auth from '@react-native-firebase/auth';
import StyledButton from "@/components/StyledButton";


export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Check your emails:");
    } catch (e: any) {

      alert('Registration failed: ' + e.message)
    } finally {
      setLoading(false)
    }

  }
  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      alert('Sign in failed')
    } finally {
      setLoading(false);
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const isButtonEnabled = isValidEmail(email) && password.length > 0;


  return (
    <View
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding">

        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setEmail(value)
            setEmailTouched(true)
          }}
          onBlur={() => setEmailTouched(true)}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        {!isValidEmail(email) && emailTouched && (
          <Text style={styles.errorText}>Please enter a valid email address</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
        />

        <StyledButton
          onPress={signIn}
          title="Sign In"
          enabled={isButtonEnabled}
        />
        <StyledButton
          onPress={signUp}
          title="Sign Up"
          color="#0000FF"
          enabled={isButtonEnabled}
        />

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'

  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  signin: {
    marginBottom: 2
  },
  errorText: {
    color: 'red',           // Red text color for error
    fontSize: 14,           // Smaller font size for error text
    marginBottom: 12,       // Add some space below the error text
  },
})
