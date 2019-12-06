//
//  QubitSDKModule.m
//  qubitsdkreactnative
//
//  Created by Michał Balawajder on 02/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "QubitSDKModule.h"
#import <QubitSDK/QubitSDK.h>
#import <React/RCTLog.h>

@implementation QubitSDKModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(init:(NSString *) trackingId logLevel:(QBLogLevel)logLevel) {
  [QubitSDK startWithTrackingId:trackingId logLevel:logLevel];
  RCTLogInfo(@"## TEST METHOD CALL");
}

- (NSDictionary *)constantsToExport {
  return @{
    @"SILENT": @(QBLogLevelDisabled),
    @"INFO": @(QBLogLevelInfo),
    @"VERBOSE": @(QBLogLevelVerbose),
    @"WARN": @(QBLogLevelWarning),
    @"DEBUG": @(QBLogLevelDebug),
    @"ERROR": @(QBLogLevelError)
  };
};

@end
