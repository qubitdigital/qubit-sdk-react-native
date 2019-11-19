import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import QubitSDK from 'qubit-sdk-react-native';

const initButtonPressed = () => {
  console.debug("Init button pressed")
  QubitSDK.init("miquido", "DEBUG");
}

const App = () => (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity onPress={QubitSDK.testMethod}>
          <Text>
            TEST METHOD FROM QUBIT-SDK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={initButtonPressed}>
          <Text>
            Init
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );

export default App;
