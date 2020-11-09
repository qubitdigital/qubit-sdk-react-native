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
    QubitSDK.start("miquido", "DEBUG");
  }

  sendEvent = () => {
    QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
  };

  enableTracker = (mode) => () => {
    QubitSDK.enable(mode);
  };

  getDeviceId = async () => {
    const devId = await QubitSDK.getDeviceId();
    console.log(devId);
  };

  getTrackerId = async () => {
    const trackId = await QubitSDK.getTrackingId();
    console.log(trackId);
  };

  getLookupData = async () => {
    const lookupData = await QubitSDK.getLookupData();
    console.log(lookupData);
  };

  getExperiences = async () => {
    const exp = await QubitSDK.getExperiences([]);
    exp.forEach(e => console.log(e));
  };

  getPlacement = async () => {
    const placement = await QubitSDK.getPlacement(
        "tsOujouCSSKJGSCMUsmQRw",
        "LIVE",
        null,
        "1ybrhki9RvKWpA-9veLQSg",
        null
    );
    console.log(placement);
    placement.impression();
  };

  sendPlacementImpression = async () => {
      const placement = await QubitSDK.getPlacement(
          "tsOujouCSSKJGSCMUsmQRw",
          "LIVE",
          null,
          "1ybrhki9RvKWpA-9veLQSg",
          null
      );
      placement.impression();
    };

  sendPlacementClickthrough = async () => {
        const placement = await QubitSDK.getPlacement(
            "tsOujouCSSKJGSCMUsmQRw",
            "LIVE",
            null,
            "1ybrhki9RvKWpA-9veLQSg",
            null
        );
        placement.clickthrough();
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
          <TouchableOpacity onPress={this.getDeviceId}>
            <Text>
              Get device id
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getLookupData}>
            <Text>
              Get lookup data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getExperiences}>
            <Text>
              Get experiences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getPlacement}>
            <Text>
              Get placement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendPlacementImpression}>
            <Text>
              Send placement impression callback
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendPlacementClickthrough}>
            <Text>
              Send placement clickthrough callback
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }
}

export default App;
