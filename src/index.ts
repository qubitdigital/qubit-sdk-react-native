import { Alert, NativeModules } from 'react-native';

const { QubitSDK } = NativeModules;

export const testMethod = () => new Promise<Boolean>((resolve) => {
    // Method for test reasons only
    Alert.alert(
        'yeah, it works',
        'test message',
    );

    resolve(true)
});

export default QubitSDK;