import React, { PureComponent } from 'react';
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import QubitSDK from 'qubit-sdk-react-native';

class App extends PureComponent {
  componentDidMount() {
    QubitSDK.init("miquido", "DEBUG");
  }

  sendEvent = () => {
    QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
  };

  enableTracker = (mode) => () => {
    QubitSDK.enableTracker(mode);
  };

  getTrackerId = async () => {
    const id = await QubitSDK.getTrackingId();
    Alert.alert(
      'Tracker Id',
      id
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <TouchableOpacity onPress={this.sendEvent}>
            <Text>
              Send event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.enableTracker(true)}>
            <Text>
              Enable tracker
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.enableTracker(false)}>
            <Text>
              Disable tracker
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getTrackerId}>
            <Text>
              Get tracker id
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }
}

export default App;
