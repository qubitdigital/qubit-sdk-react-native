# Qubit React Native SDK

Installation of the QubitSDK, to provide event tracking and lookup. To make use of this SDK, please contact your Qubit Customer Success representative.

## Getting started

### Installation

1. `$ npm install qubit-sdk-react-native --save`
or
`$ yarn add qubit-sdk-react-native`

2. Navigate to your `/ios` directory and run `pod install` to ensure the `QubitSDK` CocoaPod is installed. Android should require no further installation.

Optional - if you are using React Native &lt; 0.60, you must `link` the library.

`$ react-native link qubit-sdk-react-native`

### Usage

Import whole library in your javascript files

    import QubitSDK from 'qubit-sdk-react-native';

then initialize SDK

    QubitSDK.start("qubit");

and send first event

    QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });

### API documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

-   [start](#start)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [sendEvent](#sendevent)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [enable](#enable)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
-   [getTrackingId](#gettrackingid)
    -   [Examples](#examples-3)
-   [getDeviceId](#getdeviceid)
    -   [Examples](#examples-4)
-   [getLookupData](#getlookupdata)
    -   [Examples](#examples-5)
-   [getExperiences](#getexperiences)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-6)

#### start

Initialization of SDK. It should be called as early as possible after application start, only once and before any other interaction with the API.

##### Parameters

-   `trackingId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Tracking id (identifier of application/company etc.)
-   `logLevel` **(`"SILENT"` \| `"ERROR"` \| `"WARN"` \| `"INFO"` \| `"DEBUG"` \| `"VERBOSE"`)** Level of logs produced by native SDK. (optional, default `'WARN'`)

##### Examples

```javascript
QubitSDK.start("qubit", "DEBUG");
```

Returns **void** None

#### sendEvent

Sends event to the server.

##### Parameters

-   `eventType` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of event. eg. ecView
-   `eventBody` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Javascript map of any structure

##### Examples

```javascript
QubitSDK.sendEvent("ecView", { "type": "button", "value": "click" });
```

Returns **void** None

#### enable

Enables or disables receiving events.

##### Parameters

-   `value` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true for enabling, false for disabling

##### Examples

```javascript
QubitSDK.enable(false);
```

Returns **void** None

#### getTrackingId

Returns trackingId. Debug purposes.

##### Examples

```javascript
async () => {
 const trackingId = await QubitSDK.getTrackingId();
 ...
}
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Promise with String trackingId.

#### getDeviceId

Returns device id established by the SDK. Debug purposes.

##### Examples

```javascript
async () => {
 const deviceId = await QubitSDK.getDeviceId();
 ...
}
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Promise with String deviceId.

#### getLookupData

Returns current Lookup Data. Debug purposes.

##### Examples

```javascript
async () => {
 const lookupData = await QubitSDK.getLookupData();
 ...
}

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
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Promise with object. Although it returns Promise, it returns value only if SDK have these information at the moment of the function call.

#### getExperiences

Returns list of Experiences.

##### Parameters

-   `experienceIds` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** List of experiences ids. When array is empty, returns all experiences.
-   `variation` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Optional.
-   `preview` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Optional.
-   `ignoreSegments` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Optional.

##### Examples

```javascript
async () => {
 const experiences = await QubitSDK.getExperiences([], 0, false, false);
 experiences.forEach(e => e.shown());
 ...
}

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
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Experience>>** Promise with an array of Experience objects.

### Compatibility

Qubit SDK React Native is compatible with React Native 0.58 and higher

### Links

[Qubit website](https://www.qubit.com/)  
[Qubit Android SDK on Github](https://github.com/qubitdigital/qubit-sdk-android)  
[Qubit iOS SDK on Github](https://github.com/qubitdigital/qubit-sdk-ios)
