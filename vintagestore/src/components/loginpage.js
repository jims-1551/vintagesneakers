import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function LoginPage({ onLogin, onBrowseAsGuest }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Your password must be at least 6 characters.');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.brandMark}>
          </View>
          <Text style={styles.title}>Welcome{"\n"}back.</Text>
          <Text style={styles.subtitle}>
            Sign in to explore vintage sneakers and streetwear with a story.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError('');
              }}
              placeholder="you@example.com"
              placeholderTextColor="#A39486"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              accessibilityLabel="Email address"
              returnKeyType="next"
            />

            <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setError('');
                }}
                placeholder="Enter your password"
                placeholderTextColor="#A39486"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                accessibilityLabel="Password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                hitSlop={8}>
                <Text style={styles.showPassword}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>

            {error ? (
              <Text style={styles.error} accessibilityRole="alert">
                {error}
              </Text>
            ) : null}

            <Pressable
              style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]}
              onPress={handleLogin}
              accessibilityRole="button">
              <Text style={styles.loginButtonText}>Sign in</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.guestButton, pressed && styles.buttonPressed]}
              onPress={onBrowseAsGuest}
              accessibilityRole="button">
              <Text style={styles.guestButtonText}>Continue as guest</Text>
            </Pressable>
          </View>

          <Text style={styles.disclaimer}>
            Demo sign-in only. Account verification isn't connected yet.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4EBDD',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    padding: 28,
    backgroundColor: '#FFFDFB',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  brandMark: {
    width: 52,
    height: 52,
    marginBottom: 22,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C221E',
  },
  brandInitials: {
    color: '#FFFDFB',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eyebrow: {
    color: '#A05B39',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    marginTop: 10,
    color: '#2C221E',
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 42,
  },
  subtitle: {
    marginTop: 10,
    color: '#746355',
    fontSize: 14,
    lineHeight: 21,
  },
  form: {
    marginTop: 28,
  },
  label: {
    marginBottom: 8,
    color: '#4F3F34',
    fontSize: 13,
    fontWeight: '700',
  },
  passwordLabel: {
    marginTop: 18,
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    color: '#2C221E',
    fontSize: 15,
    backgroundColor: '#FAF6F0',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 10,
  },
  passwordContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    backgroundColor: '#FAF6F0',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 14,
    color: '#2C221E',
    fontSize: 15,
  },
  showPassword: {
    color: '#8A563A',
    fontSize: 13,
    fontWeight: '700',
  },
  error: {
    marginTop: 10,
    color: '#A33424',
    fontSize: 13,
  },
  loginButton: {
    minHeight: 52,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C221E',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#FFFDFB',
    fontSize: 15,
    fontWeight: '700',
  },
  guestButton: {
    minHeight: 48,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 10,
  },
  guestButtonText: {
    color: '#5A4537',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  disclaimer: {
    marginTop: 20,
    color: '#8A7B6D',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});