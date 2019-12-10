//
//  QubitSDKModule.swift
//  QubitSDKModule
//
//  Created by Michał Balawajder on 09/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import QubitSDK

@objc(QubitSDKModule)
class QubitSDKModule: NSObject {
    
    @objc(init:logLevel:)
    func `init`(trackingId: String, logLevel: String) {
        QubitSDK.start(withTrackingId: trackingId, logLevel: QBLogLevel.logLevel(from: logLevel))
    }
    
    @objc(sendEvent:eventBody:)
    func sendEvent(eventType: String, eventBody: [String: Any]) {
        QubitSDK.sendEvent(type: eventType, dictionary: eventBody)
    }
    
    @objc(enableTracker:)
    func enableTracker(enable: Bool) {
        //TODO ios sdk doesn't contain method for pausing and starting tracker again.
        //There is only stopTracking() method, and after that, SDK has to be reinited.
        //Possibly need to implement
        guard !enable else {return}
        QubitSDK.stopTracking()
    }
    
    @objc(getTrackingId:rejecter:)
    func getTrackingId(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        resolver(QubitSDK.trackingId)
    }
    
    @objc(getDeviceId:rejecter:)
    func getDeviceId(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        resolver(QubitSDK.deviceId)
    }
    
    @objc(getLookupData:rejecter:)
    func getLookupData(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        //TODO looks like there is no public method inside QubitSDK to retrieve this, need to implement?
        resolver(nil)
    }
    
    @objc(getExperiences:isVariationSet:variation:isPreviewSet:preview:isIgnoreSegmentsSet:ignoreSegments:resolver:rejecter:)
    func getExperiences(experienceIds: [Int], isVariationSet: Bool, variation: Int, isPreviewSet: Bool, preview: Bool, isIgnoreSegmentsSet: Bool, ignoreSegments: Bool,  resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        QubitSDK.fetchExperiences(withIds: experienceIds, onSuccess: { result in
            resolver(result)
        }, onError: { error in
            rejecter("Error", "QubitSDKModule: getExperiences failed.", error)
        }, preview: isPreviewSet ? preview : false,
           ignoreSegments: isIgnoreSegmentsSet ? ignoreSegments : false,
           variation: isVariationSet ? NSNumber(integerLiteral: variation) : nil)
    }
    
    @objc(experienceShown:)
    func experienceShown(callback: String) {
        guard let expEntity = QBExperienceEntity(callback: callback) else {return}
        expEntity.shown()
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }
}
