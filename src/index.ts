import { NativeModules } from 'react-native';

/**
 * Experience object
 * @typedef {object} Experience
 * @property {object} payload - payload object
 * @property {boolean} isControl
 * @property {number} id - Id of Experience
 * @property {string} callback - Callback URL
 * @property {number} variation - Indicates variation number
 * @property {function} shown - Sends to server information, that experience was shown
 */

type Experience = {
    payload: object,
    isControl: boolean,
    id: number,
    callback: string,
    variation: number,
    shown: () => void
}

type Placement = {
    content: object,
    impression: () => void,
    clickthrough: () => void
}

class QubitSDK {
    /**
     * Initialization of SDK. It should be called as early as possible after application start, only once and before any other interaction with the API.
     * @param {string} trackingId Tracking id (identifier of application/company etc.)
     * @param {'SILENT'|'ERROR'|'WARN'|'INFO'|'DEBUG'|'VERBOSE'} [logLevel='WARN'] Level of logs produced by native SDK.
     * @returns {void} None
     * @example
     *
     * QubitSDK.start("qubit", "DEBUG");
     */
    public start(trackingId : string, logLevel : 'SILENT'|'ERROR'|'WARN'|'INFO'|'DEBUG'|'VERBOSE') : void {
        NativeModules.QubitSDK.init(
            trackingId || '',
            logLevel || ''
        );
    }

    /**
     * Sends event to the server.
     * @param {string} eventType Type of event. eg. ecView
     * @param {object} eventBody Javascript map of any structure
     * @returns {void} None
     * @example
     *
     * QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
     */
    public sendEvent(
        eventType : string,
        eventBody : object
    ) : void {
        NativeModules.QubitSDK.sendEvent(
            eventType || '',
            eventBody || {}
        );
    }

    /**
     * Enables or disables receiving events.
     * @param {boolean} value true for enabling, false for disabling
     * @returns {void} None
     * @example
     *
     * QubitSDK.enable(false);
     */
    public enable(value: boolean) {
        NativeModules.QubitSDK.enableTracker(
            value != null ? value : true
        );
    }

    /**
     * Returns trackingId. Debug purposes.
     * @returns {Promise<string>} Promise with String trackingId.
     * @example
     *
     * async () => {
     *  const trackingId = await QubitSDK.getTrackingId();
     *  ...
     * }
     */
    public getTrackingId() : Promise<string> {
        return NativeModules.QubitSDK.getTrackingId();
    }

    /**
     * Returns device id established by the SDK. Debug purposes.
     * @returns {Promise<string>} Promise with String deviceId.
     * @example
     *
     * async () => {
     *  const deviceId = await QubitSDK.getDeviceId();
     *  ...
     * }
     */
    public getDeviceId() : Promise<string> {
        return NativeModules.QubitSDK.getDeviceId();
    };

    /**
     * Returns current Lookup Data. Debug purposes.
     * @returns {Promise<string>} Promise with object. Although it returns Promise, it returns value only if SDK have these information at the moment of the function call.
     * @example
     *
     * async () => {
     *  const lookupData = await QubitSDK.getLookupData();
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
    public getLookupData() : Promise<object> {
        return NativeModules.QubitSDK.getLookupData();
    };

    /**
     * Returns list of Experiences.
     * @param {array<number>} experienceIds List of experiences ids. When array is empty, returns all experiences.
     * @param {number} [variation] Optional.
     * @param {boolean} [preview] Optional.
     * @param {boolean} [ignoreSegments] Optional.
     * @returns {Promise<array<Experience>>} Promise with an array of Experience objects.
     * @example
     *
     * async () => {
     *  const experiences = await QubitSDK.getExperiences([], 0, false, false);
     *  experiences.forEach(e => e.shown());
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
    public getExperiences(
        experienceIds: Array<number>,
        variation?: number,
        preview?: boolean,
        ignoreSegments?: boolean
    ) : Promise<Experience[]> {
        return NativeModules.QubitSDK.getExperiences(
            experienceIds || [],
            !(variation == null),
            variation || 0,
            !(preview == null),
            preview || false,
            !(ignoreSegments == null),
            ignoreSegments || false
        )
            .then(experiences => experiences.map(e => ({
                ...e, 
                shown: () => { NativeModules.QubitSDK.experienceShown(e.callback || '') } 
            })))
    }

    /**
     * Returns Placement for given parameters.
     * @param {string} placementId Unique ID of the placement.
     * @param {string} [mode] The mode to fetch placements content with, can be one of LIVE/SAMPLE/PREVIEW. Defaults to LIVE.
     * @param {string} [attributes] JSON string containing custom attributes to be used to query for the placement. "visitor" attribute will be ignored as it is set by SDK.
     * @param {string} [campaignId] Optional.
     * @param {string} [experienceId] Optional.
     * @returns {Promise<Placement>} Promise with an object describing Placement object.
     * @example
     *
     * async () => {
     *  const placement = await getPlacement(
     *      "placement_id",
     *  	"LIVE",
     *  	"{ \"color\": \"blue\"}",
     *  	"campaign_id",
     *  	"experience_id"
     *  );
     *  ...
     *  placement.impression();
     *  ...
     *  placement.clickthrough();
     * }
     *
     * {
     *   "image": "https://image.store.com/images/example.jpeg",
     *   "message": "Hello World",
     *   "url": "https://www.qubit.com"
     *   "impressionUrl": "https://api.qubit.com/placements/callback?data=ggW4eyJtZXRhIjp7ImlkIjo",
     *   "clickthroughUrl": "https://api.qubit.com/placements/callback?data=mQW4eyJtZXRhIjp7Imlkx"
     * }
     */
    public getPlacement(
        placementId: string,
        mode?: string,
        attributes?: string,
        campaignId?: string,
        experienceId?: string
    ) : Promise<Placement> {
        return NativeModules.QubitSDK.getPlacement(
            placementId,
            mode,
            attributes,
            campaignId,
            experienceId
        )
             .then(placement => ({
                ...placement,
                impression: () => { NativeModules.QubitSDK.placementImpression(placement.impressionUrl || '') },
                clickthrough: () => { NativeModules.QubitSDK.placementClickthrough(placement.clickthroughUrl || '') }
            }))
    }
}

export default new QubitSDK();
