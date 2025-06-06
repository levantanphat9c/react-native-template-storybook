import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch} from '../ReduxSaga/hooks';
import {setUser, clearUser} from '../ReduxSaga/slices/userSlice';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    dispatch(
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    );
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Screen</Text>

        {isLoggedIn ? (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.guestInfo}>
            <Text style={styles.guestText}>You are not logged in</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login as Demo User</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  guestInfo: {
    alignItems: 'center',
  },
  guestText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;
