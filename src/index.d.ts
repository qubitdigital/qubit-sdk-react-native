declare module 'qubit-sdk-react-native' {
    export function testMethod(): Promise<boolean>;
    export function testMethod(trackingId: String, logLevel: String): Promise<boolean>;
}