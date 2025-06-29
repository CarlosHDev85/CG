import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://192.168.1.100:3000'; // Update this IP as needed

  const checkUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (data.exists) {
        setShowPasswordField(true);
        setIsRegistering(false);
        Alert.alert('Username Found', 'Please enter your password to login');
      } else {
        setShowPasswordField(true);
        setIsRegistering(true);
        Alert.alert('New User', 'Username not found. Please set a password to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check username. Please try again.');
      console.error('Username check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthentication = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegistering ? '/api/user/register' : '/api/user/login';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setCurrentUser(username);
        setShowPasswordField(false);
        setPassword('');
        
        if (isRegistering) {
          Alert.alert('Success', 'Account created successfully!');
        } else {
          Alert.alert('Success', 'Logged in successfully!');
          // Load existing preferences for existing users
          if (data.preferences) {
            setName(data.preferences.name || '');
            setPreferences(data.preferences.text || '');
          }
        }
      } else {
        Alert.alert('Error', data.message || 'Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!isLoggedIn) {
      Alert.alert('Error', 'Please login first');
      return;
    }

    if (preferences.length > 800) {
      Alert.alert('Error', 'Preferences must be 800 characters or less');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: currentUser, 
          name, 
          text: preferences 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Preferences saved successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to save preferences');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
      console.error('Save preferences error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUsername('');
    setPassword('');
    setName('');
    setPreferences('');
    setShowPasswordField(false);
    setIsRegistering(false);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Profile</Text>

        {!isLoggedIn ? (
          <View style={styles.authContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
              editable={!showPasswordField}
            />
            
            {!showPasswordField && (
              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={checkUsername}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Checking...' : 'Confirm Username'}
                </Text>
              </TouchableOpacity>
            )}

            {showPasswordField && (
              <View>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={isRegistering ? "Set your password" : "Enter your password"}
                  secureTextEntry
                />
                
                <TouchableOpacity 
                  style={[styles.button, loading && styles.buttonDisabled]} 
                  onPress={handleAuthentication}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.linkButton} 
                  onPress={() => {
                    setShowPasswordField(false);
                    setPassword('');
                  }}
                >
                  <Text style={styles.linkText}>Try different username</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <Text style={styles.welcomeText}>Welcome, {currentUser}!</Text>
            
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            <Text style={styles.label}>My Preferences (up to 800 characters):</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={preferences}
              onChangeText={setPreferences}
              placeholder="Write about your preferences, interests, or anything you'd like to save..."
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              maxLength={800}
            />
            <Text style={styles.charCount}>
              {preferences.length}/800 characters
            </Text>

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={savePreferences}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Preferences'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: -12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;