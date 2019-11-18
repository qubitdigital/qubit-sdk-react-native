import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import QubitSDK from 'qubit-sdk-react-native';

const App = () => (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity onPress={QubitSDK.testMethod}>
          <Text>
            TEST METHOD FROM QUBIT-SDK
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );

export default App;
