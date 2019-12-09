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

@end
