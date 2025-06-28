import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      // This will be updated later once Claude is done with the backend.
      const response = await fetch('http://localhost:3000/api/status');
      const data = await response.json();
      setServerResponse(data);
    } catch (error) {
      console.error(error);
      setServerResponse({ status: 'error', message: 'Failed to connect to server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home Screen</ThemedText>
      <Button title="Test Server Connection" onPress={handlePress} />
      {loading && <ActivityIndicator size="large" />}
      {serverResponse && (
        <ThemedView style={styles.responseContainer}>
          <ThemedText type="subtitle">Server Response:</ThemedText>
          <ThemedText>Status: {serverResponse.status}</ThemedText>
          <ThemedText>Message: {serverResponse.message}</ThemedText>
          <ThemedText>Test String: {serverResponse.testString}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  responseContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
});