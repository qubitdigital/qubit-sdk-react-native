import { NativeModules, Platform } from 'react-native';

/**
 * Initialization of SDK. It should be called as early as possible after application start, only once and before any other interaction with the API.
 * @param {string} trackingId Tracking id (identifier of application/company etc.)
 * @param {('SILENT', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'VERBOSE')} logLevel Level of logs produced by native SDK.
 * @returns {void} None
 * @example
 *
 * QubitSDK.init("qubit", "DEBUG");
 */
export const init = (
    trackingId : String,
    logLevel : 'SILENT'|'ERROR'|'WARN'|'INFO'|'DEBUG'|'VERBOSE'
) : void  => {
    if (Platform.OS === 'ios') return;
    NativeModules.QubitSDK.init(trackingId, logLevel);
};

/**
 * Sends event to the server.
 * @param {string} eventType Type of event. eg. ecView
 * @param {object} eventBody Javascript map of any structure
 * @returns {void} None
 * @example
 *
 * QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
 */
export const sendEvent = (
    eventType : String,
    eventBody : Object
) : void => {
    if (Platform.OS === 'ios') return;
    NativeModules.QubitSDK.sendEvent(eventType, eventBody);
};

/**
 * Enables or disables receiving events.
 * @param {boolean} enable true for enabling, false for disabling
 * @returns {void} None
 * @example
 *
 * QubitSDK.enableTracker(false);
 */
export const enableTracker = (
    enable: Boolean
) : void => {
    if (Platform.OS === 'ios') return;
    NativeModules.QubitSDK.enableTracker(enable);
};

/**
 * Returns trackingId. Debug purposes.
 * @returns {promise<string>} Promise with String trackingId.
 * @example
 *
 * async function asyncFunction() {
 *  var trackingId = await QubitSDK.getTrackingId();
 *  ...
 * }
 */
export const getTrackingId = () : Promise<String> => {
    if (Platform.OS === 'ios') return Promise.reject();
    return NativeModules.QubitSDK.getTrackingId();
};

/**
 * Returns device id established by the SDK. Debug purposes.
 * @returns {promise<string>} Promise with String deviceId.
 * @example
 *
 * async function asyncFunction() {
 *  var deviceId = await QubitSDK.getDeviceId();
 *  ...
 * }
 */
export const getDeviceId = () : Promise<String> => {
    if (Platform.OS === 'ios') return Promise.reject();
    return NativeModules.QubitSDK.getDeviceId();
};

/**
 * Returns current Lookup Data. Debug purposes.
 * @returns {promise<string>} Promise with object. Although it returns Promise, it returns value only if SDK have these information at the moment of the function call.
 * @example
 *
 * async function asyncFunction() {
 *  var lookupData = await QubitSDK.getLookupData();
 *  ...
 * }
 *
 * { viewNumber: 10,
 *  sessionNumber: 4,
 *  lastViewTs: 1863218003,
 *  ipLocation:
 *   { regionCode: '36004',
 *     region: 'unknown',
 *     longitude: 19.9612,
 *     latitude: 50.0495,
 *     countryCode: 'PL',
 *     country: 'poland',
 *     cityCode: '1803',
 *     city: 'krakow',
 *     areaCode: 'unknown',
 *     area: 'unknown' },
 *  ipAddress: '93.180.179.112',
 *  firstViewTs: 1696635454
 * }
 */
export const getLookupData = () : Promise<Object> => {
    if (Platform.OS === 'ios') return Promise.reject();
    return NativeModules.QubitSDK.getLookupData();
};

/**
 * Returns list of Experiences.
 * @param {array<number>>} experienceIds List of experiences ids. When array is empty, returns all experiences.
 * @param {boolean} isVariationSet Is variation parameter meaningful?
 * @param {number} variation Meaningful only when isVariationSet is true?
 * @param {boolean} isPreviewSet Is preview parameter meaningful?
 * @param {boolean} preview Meaningful only when isPreviewSet is true?
 * @param {boolean} isIgnoreSegmentsSet Is ignoreSegments parameter meaningful?
 * @param {boolean} ignoreSegments Meaningful only when isIgnoreSegmentsSet is true?
 * @returns {promise<array<object>>} Promise with an array of Experiences objects.
 * @example
 *
 * async function asyncFunction() {
 *  var experiences = await QubitSDK.getExperiences([], false, 0, false, false, false, false);
 *  ...
 * }
 *
 * { variation: 852190,
 *    payload: {},
 *    isControl: false,
 *    id: 143640,
 *    callback: 'https://sse.qubit.com/v1/callback?data=igKAeyJFeHBlcmllbmNlSWQiOjE0MzY0MCwiSXRlcmF0aW9uARUsMzc2MDY3LCJWYXJpFRUUODUyNzc0HRUUTWFzdGVyATAQODUyMTkBRXBzQ29udHJvbCI6ZmFsc2UsIlRyYWZmaWNBbGxvYwVKTCI6MC40NzUsIlByb2JhYmlsaXR5ARRQODI1NjI2MTk0NTgyNDQ5MSwiUGlkVhkAGFRlbXBsYXQFvwxudWxsBWZMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjQhleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0='
 *  },
 * { variation: 855620,
 *    payload: { show_share: false,
 *      show_sale_banner: false,
 *      sale_banner: 'https://dd6zx4ibq538k.cloudfront.net/static/images/5010/626263d0b3d3230f4062da1e0d1395ad_1300_554.jpeg',
 *     free_shipping: 'Shipping is free for you!' },
 *    isControl: false,
 *    id: 144119,
 *    callback: 'https://sse.qubit.com/v1/callback?data=jAKAeyJFeHBlcmllbmNlSWQiOjE0NDExOSwiSXRlcmF0aW9uARUsNDUyOTEwLCJWYXJpFRUYMTAxMDcyMh0WFE1hc3RlcgExmDg1NTYyMCwiSXNDb250cm9sIjpmYWxzZSwiVHJhZmZpY0FsbG9jYQFgSCI6MC4yNSwiUHJvYmFiaWxpdHkBE2A0ODAwMTM4OTg0MjEwNjM3MywiUGlkIjowThoAGFRlbXBsYXQFwQxudWxsBWdMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjghleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0='
 *  },
 * { variation: 972984,
 *    payload: {},
 *    isControl: true,
 *    id: 160862,
 *    callback: 'https://sse.qubit.com/v1/callback?data=iQKAeyJFeHBlcmllbmNlSWQiOjE2MDg2MiwiSXRlcmF0aW9uARUsNDM0NjIzLCJWYXJpFRUUOTcyOTg0HRUUTWFzdGVyATARG3BJc0NvbnRyb2wiOnRydWUsIlRyYWZmaWNBbGxvYwVJRCI6MC41LCJQcm9iYWJpbGl0eQESVDAzNjQzMTAyMTQ3MTU5ODkyLCJQaWRaGgAYVGVtcGxhdAW-DG51bGwFZhBja2luZwGLKCJtaXF1aWRvIiwiAYwIZXh0BRZEODJhY2MzYmNhYmJjYWMzNiJ9'
 *  }
 * ]
 */
export const getExperiences = (
    experienceIds: Array<Number>,
    isVariationSet: Boolean,
    variation: Number,
    isPreviewSet: Boolean,
    preview: Boolean,
    isIgnoreSegmentsSet: Boolean,
    ignoreSegments: Boolean
) : Promise<Object[]> => {
    if (Platform.OS === 'ios') return Promise.reject();
    return NativeModules.QubitSDK.getExperiences(experienceIds, isVariationSet, variation, isPreviewSet, preview, isIgnoreSegmentsSet, ignoreSegments);
};

/**
 * Sends to server information, that experience was shown
 * @param {string} callback Value of callback property in the result of getExperiences function.
 * @example
 *
 * QubitSDK.experienceShown("https://sse.qubit.com/v1/callback?data=igK....n0=");
 */
export const experienceShown = (callback : string) : void => {
    if (Platform.OS === 'ios') return;
    NativeModules.QubitSDK.experienceShown(callback);
};

export default {
    init,
    sendEvent,
    enableTracker,
    getTrackingId,
    getDeviceId,
    getLookupData,
    getExperiences,
    experienceShown
};
