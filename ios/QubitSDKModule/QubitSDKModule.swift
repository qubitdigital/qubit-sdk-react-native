//
//  QubitSDKModule.swift
//  QubitSDKModule
//
//  Created by Michał Balawajder on 09/12/2019.
//

import Foundation
import QubitSDK

@objc(QubitSDKModule)
class QubitSDKModule: NSObject {
    
    @objc(init:logLevel:)
    func `init`(trackingId: String, logLevel: String) {
        QubitSDK.start(withTrackingId: trackingId, logLevel: QBLogLevel.logLevel(from: logLevel), queuePriority: .background)
    }
    
    @objc(sendEvent:eventBody:)
    func sendEvent(eventType: String, eventBody: [String: Any]) {
        QubitSDK.sendEvent(type: eventType, dictionary: eventBody)
    }
    
    @objc(enableTracker:)
    func enableTracker(enable: Bool) {
        QubitSDK.enableTracker(enable: enable)
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
        guard let lookup = QubitSDK.getLookupData() else {
            rejecter("Error", "QubitModuleSDK: getLookupData returned nil; probably no lookup data yet", nil)
            return
        }
        resolver(lookup.dictionary)
    }
    
    @objc(getExperiences:isVariationSet:variation:isPreviewSet:preview:isIgnoreSegmentsSet:ignoreSegments:resolver:rejecter:)
    func getExperiences(experienceIds: [Int], isVariationSet: Bool, variation: Int, isPreviewSet: Bool, preview: Bool, isIgnoreSegmentsSet: Bool, ignoreSegments: Bool,  resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        QubitSDK.fetchExperiences(withIds: experienceIds, onSuccess: { result in
            resolver(result.map({ $0.asDictionary }))
        }, onError: { error in
            rejecter("Error", "QubitSDKModule: getExperiences failed.", error)
        }, preview: isPreviewSet ? preview : false,
           ignoreSegments: isIgnoreSegmentsSet ? ignoreSegments : false,
           variation: isVariationSet ? NSNumber(integerLiteral: variation) : nil)
    }
    
    @objc(experienceShown:)
    func experienceShown(callback: String) {
        QBExperienceEntityCallback(callback: callback).shown()
    }

    @objc(getPlacement:mode:attributes:campaignId:experienceId:resolver:rejecter:)
    func getPlacement(placementId: String, mode: String, attributes: String, campaignId: String, experienceId: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        QubitSDK.getPlacement(with: placementId,
                              mode: mode,
                              attributes: attributes,
                              campaignId: campaignId,
                              experienceId: experienceId,
                              onSuccess: { result in
                                resolver( result.asDictionary )
                              }, onError: { error in
                                rejecter("Error", "QubitSDKModule: getPlacement failed.", error)
                              })
    }

    @objc(placementImpression:)
    func placementImpression(callback: String) {
        QBPlacementEntityCallback(impressionUrl: callback).impression()
    }

    @objc(placementClickthrough:)
    func placementClickthrough(callback: String) {
        QBPlacementEntityCallback(clickthroughUrl: callback).clickthrough()
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
