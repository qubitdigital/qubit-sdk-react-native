//
//  QubitSDKModule.m
//  QubitSDKModule
//
//  Created by Michał Balawajder on 09/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(QubitSDKModule, NSObject)

RCT_EXTERN_METHOD(init:(NSString *)trackingId logLevel:(NSString *)logLevel)
RCT_EXTERN_METHOD(sendEvent:(NSString *)eventType eventBody:(NSDictionary *)eventBody)
RCT_EXTERN_METHOD(enableTracker:(BOOL)enable)
RCT_EXTERN_METHOD(getTrackingId:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
RCT_EXTERN_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
RCT_EXTERN_METHOD(getLookupData:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
RCT_EXTERN_METHOD(getExperiences:
                  (NSArray *) experienceIds
                  isVariationSet:(BOOL) isVariationSet
                  variation:(NSNumber *) variation
                  isPreviewSet:(BOOL) isPreviewSet
                  preview:(BOOL) preview
                  isIgnoreSegmentsSet:(BOOL) isIgnoreSegmentsSet
                  ignoreSegents:(BOOL) ignoreSegments
                  resolver:(RCTPromiseResolveBlock) resolver
                  rejecter:(RCTPromiseRejectBlock) rejecter)
RCT_EXTERN_METHOD(experienceShown:(NSString *) callback)

@end
