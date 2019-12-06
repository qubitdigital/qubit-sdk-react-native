//
//  QubitSDKModuleEnumConverter.m
//  qubitsdkreactnative
//
//  Created by Michał Balawajder on 02/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <QubitSDK/QubitSDK.h>
#import <React/RCTConvert.h>

@implementation RCTConvert (QBLogLevel)

RCT_ENUM_CONVERTER(QBLogLevel, (@{
  @"SILENT": @(QBLogLevelDisabled),
  @"INFO": @(QBLogLevelInfo),
  @"VERBOSE": @(QBLogLevelVerbose),
  @"WARN": @(QBLogLevelWarning),
  @"DEBUG": @(QBLogLevelDebug),
  @"ERROR": @(QBLogLevelError)
}), QBLogLevelWarning, integerValue)

@end
