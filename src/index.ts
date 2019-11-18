// TODO: Lines below to be used
// import { Alert, NativeModules } from 'react-native';
// const { QubitSDK } = NativeModules;

import { Alert } from 'react-native';

export const testMethod = () => new Promise<Boolean>((resolve) => {
    // TODO: Method for test reasons only
    Alert.alert(
        'yeah, it works',
        'test message',
    );

    resolve(true)
});

export default {
    testMethod
};