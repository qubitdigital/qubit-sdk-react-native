import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

const App = () => (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity>
          <Text>
            TEST METHOD FROM QUBIT-SDK
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );

export default App;
