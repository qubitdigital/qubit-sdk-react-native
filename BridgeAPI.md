
# Interaction schema

        User 
          |
          v
    Qubit SDK ReactNative  
          |
          v
     Javascript ReactNative Bridge API 
        |                            |
        v                            v
    Android Bridge API         iOS Bridge API     
        |                            |
        v                            v
    Qubit SDK Android           Qubit SDK iOS

# Javascript ReactNative Bridge API

List of functions of Javascript module, which have to be implemented in 
native modules for both platforms: Android and iOS.

- init
- sendEvent
- enableTracker
- getTrackingId
- getDeviceId
- getLookupData
- getExperiences
- experienceShown
- getPlacement
- placementImpression
- placementClickthrough

-------------------------------------------------------
## **init(trackingId, logLevel)**

### Description
Initialization of SDK. It should be called as early as possible after 
application start, only once and before any other interaction with the API.

### Parameters
- trackingId 
    - Type: String 
    - Constraints: Not null, not empty 
    - Description: Tracking id (identifier of application/company etc.)
- logLevel 
    - Type: String 
    - Constraints: Not null. 
      One of values: SILENT, ERROR, WARN, INFO, DEBUG, VERBOSE. 
      Any other value causes setting default value, which is WARN.
    - Level of logs produced by native SDK.

### Result
None

### Example

    QubitSDK.init("miquido", "DEBUG");

-------------------------------------------------------

## **sendEvent(eventType, eventBody)**

### Description
Sends event to the server.

### Parameters
- eventType
    - Type: String
    - Constraints: Not null
    - Description: Type of event. eg. ecView
- eventBody
    - Type: Javascript map of any structure
    - Type: Not null
    - Description: Event body

### Result
None

### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });  


-------------------------------------------------------

## **enableTracker(enable)**

### Description
Enables or disables receiving events.

### Parameters
- enable
    - Type: Boolean
    - Constraints: Not null
    - Description: true for enabling, false for disabling

### Result
None

### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    QubitSDK.enableTracker(false);  


-------------------------------------------------------

## **getTrackingId()**

### Description
Returns trackingId. Debug purposes.

### Parameters
None

### Result
Promise with String trackingId.

### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    async function asyncFunction() {
        var deviceId = await QubitSDK.getTrackingId();
        ...
    }  


-------------------------------------------------------

## **getDeviceId()**

### Description
Returns device id established by the SDK. Debug purposes.

### Parameters
None

### Result
Promise with String deviceId.

### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    async function asyncFunction() {
        var deviceId = await QubitSDK.getDeviceId();
        ...
    }  


-------------------------------------------------------

## **getLookupData()**

### Description
Returns current Lookup Data. Debug purposes. 
Although it returns Promise, it returns value only if SDK have these 
information at the moment of the function call.

### Parameters
None

### Result
Promise with Javascript map:

    { viewNumber: 10,
      sessionNumber: 4,
      lastViewTs: 1863218003,
      ipLocation: 
       { regionCode: '36004',
         region: 'unknown',
         longitude: 19.9612,
         latitude: 50.0495,
         countryCode: 'PL',
         country: 'poland',
         cityCode: '1803',
         city: 'krakow',
         areaCode: 'unknown',
         area: 'unknown' },
      ipAddress: '93.180.179.112',
      firstViewTs: 1696635454 
    }


### Exceptions
- Exception is thrown, when SDK is not initialized.
- Exception is thrown, when SDK hasn't fetched Lookup data from server yet.

### Example
    async function asyncFunction() {
        var lookupData = await QubitSDK.getLookupData();
        ...
    }  


-------------------------------------------------------

## **getExperiences**(experienceIds, isVariationSet, variation, isPreviewSet, preview, isIgnoreSegmentsSet, ignoreSegments)

### Description
Returns list of Experiences.

### Parameters
- experienceIds
    - Type: Array of Integers
    - Constraints: Not null.
    - Description: List of experiences ids. When array is empty, returns all experiences.
- isVariationSet
    - Type: Boolean
    - Constraints: Not null.
    - Description: Is `variation` parameter meaningful?
- variation
    - Type: Integer
    - Constraints: Not null.
    - Description: Meaningful only when `isVariationSet` is true?
- isPreviewSet
    - Type: Boolean
    - Constraints: Not null.
    - Description: Is `preview` parameter meaningful?
- preview
    - Type: Boolean
    - Constraints: Not null.
    - Description: Meaningful only when `isPreviewSet` is true?
- isIgnoreSegmentsSet
    - Type: Boolean
    - Constraints: Not null.
    - Description: Is `ignoreSegments` parameter meaningful?
- ignoreSegments
    - Type: Boolean
    - Constraints: Not null.
    - Description: Meaningful only when `isIgnoreSegmentsSet` is true?

### Result
Promise with an array of Experiences objects. Example:
    
    [ 
      { variation: 852190,
        payload: {},
        isControl: false,
        id: 143640,
        callback: 'https://sse.qubit.com/v1/callback?data=igKAeyJFeHBlcmllbmNlSWQiOjE0MzY0MCwiSXRlcmF0aW9uARUsMzc2MDY3LCJWYXJpFRUUODUyNzc0HRUUTWFzdGVyATAQODUyMTkBRXBzQ29udHJvbCI6ZmFsc2UsIlRyYWZmaWNBbGxvYwVKTCI6MC40NzUsIlByb2JhYmlsaXR5ARRQODI1NjI2MTk0NTgyNDQ5MSwiUGlkVhkAGFRlbXBsYXQFvwxudWxsBWZMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjQhleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0=' 
      },
      { variation: 855620,
        payload: { show_share: false,
          show_sale_banner: false,
          sale_banner: 'https://dd6zx4ibq538k.cloudfront.net/static/images/5010/626263d0b3d3230f4062da1e0d1395ad_1300_554.jpeg',
          free_shipping: 'Shipping is free for you!' },
        isControl: false,
        id: 144119,
        callback: 'https://sse.qubit.com/v1/callback?data=jAKAeyJFeHBlcmllbmNlSWQiOjE0NDExOSwiSXRlcmF0aW9uARUsNDUyOTEwLCJWYXJpFRUYMTAxMDcyMh0WFE1hc3RlcgExmDg1NTYyMCwiSXNDb250cm9sIjpmYWxzZSwiVHJhZmZpY0FsbG9jYQFgSCI6MC4yNSwiUHJvYmFiaWxpdHkBE2A0ODAwMTM4OTg0MjEwNjM3MywiUGlkIjowThoAGFRlbXBsYXQFwQxudWxsBWdMY2tpbmdJZCI6Im1pcXVpZG8iLCIBjghleHQFFkQ4MmFjYzNiY2FiYmNhYzM2In0=' 
      },
      { variation: 972984,
        payload: {},
        isControl: true,
        id: 160862,
        callback: 'https://sse.qubit.com/v1/callback?data=iQKAeyJFeHBlcmllbmNlSWQiOjE2MDg2MiwiSXRlcmF0aW9uARUsNDM0NjIzLCJWYXJpFRUUOTcyOTg0HRUUTWFzdGVyATARG3BJc0NvbnRyb2wiOnRydWUsIlRyYWZmaWNBbGxvYwVJRCI6MC41LCJQcm9iYWJpbGl0eQESVDAzNjQzMTAyMTQ3MTU5ODkyLCJQaWRaGgAYVGVtcGxhdAW-DG51bGwFZhBja2luZwGLKCJtaXF1aWRvIiwiAYwIZXh0BRZEODJhY2MzYmNhYmJjYWMzNiJ9' 
      } 
    ]


### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    async function asyncFunction() {
        var experiences = await QubitSDK.getExperiences([], false, 0, false, false, false, false);
        ...
    }  


-------------------------------------------------------

## **experienceShown**(callback)

### Description
Sends to server information, that experience was shown

### Parameters
- callback
    - Type: String
    - Constraints: Not null.
    - Description: Value of callback property in the result of getExperiences function.

### Result
None


### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    QubitSDK.experienceShown("https://sse.qubit.com/v1/callback?data=igK....n0=");

-------------------------------------------------------

## **getPlacement**(placementId, mode, attributes, campaignId, experienceId, placementPromise)

### Description
Returns Placement for given parameters.

### Parameters
- placementId
    - Type: String
    - Constraints: Not null
    - Description: Unique ID of the placement.
- mode
    - Type: String
    - Constraints: Can be one of LIVE/SAMPLE/PREVIEW. 
    - Description: The mode to fetch placements content with. Defaults to LIVE.
- attributes
    - Type: String
    - Constraints: Should be string description of JSON or null
    - Description: JSON string containing custom attributes to be used to query for the placement. "visitor" attribute will be ignored as it is set by SDK.
- campaignId
    - Type: String
    - Constraints: Nullable
    - Description: Campaign identifier
- experienceId
    - Type: String
    - Constraints: Nullable
    - Description: Experience identifier
- placementPromise
    - Type: Promise
    - Constraints: Not null
    - Description: Promise with query result

### Result
Promise with a map describing Placement object. Example:
    
     {
        "image": "https://image.store.com/images/example.jpeg",
        "message": "Hello World",
        "url": "https://www.qubit.com"
        "impressionUrl": "https://api.qubit.com/placements/callback?data=ggW4eyJtZXRhIjp7ImlkIjo",
        "clickthroughUrl": "https://api.qubit.com/placements/callback?data=mQW4eyJtZXRhIjp7Imlkx"
     }


### Exceptions
- Exception is thrown, when SDK is not initialized.

### Example
    async () => {
      const placement = await QubitSDK.getPlacement(
	 	  "placement_id",
	 	  "LIVE",
	 	  "{ \"color\": \"blue\"}",
	 	  "campaign_id",
	 	  "experience_id"
	   );
	   ...
	}
	
-------------------------------------------------------

## placementImpression(callbackUrl)

### Description
Sends request to URL described by placement impression callback.

### Parameters
- callbackUrl
    - Type: String
    - Constraints: Not null
    - Description: Impression callback URL.


### Result
None

### Example
	async () => {
	  const placement = await QubitSDK.placementImpression(
	    "https://some.url.com"
	  );
	  ...
    }

-------------------------------------------------------

## placementClickthrough(callbackUrl)

### Description
Sends request to URL described by placement clickthrough callback.

### Parameters
- callbackUrl
    - Type: String
    - Constraints: Not null
    - Description: Clickthrough callback URL.


### Result
None

### Example
	async () => {
	  const placement = await QubitSDK.placementClickthrough(
	    "https://some.url.com"
	  );
	  ...
	}


