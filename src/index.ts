import { Alert, NativeModules } from 'react-native';

export const testMethod = () => new Promise<Boolean>((resolve) => {
    // TODO: Method for test reasons only
    Alert.alert(
        'yeah, it works',
        'test message',
    );

    resolve(true)
});

export const init = (trackingId: String, logLevel: String) => {
    console.debug("QubitSDK: Init");
    NativeModules.QubitSDK.init(trackingId, logLevel)
};

export default {
    testMethod, init
};