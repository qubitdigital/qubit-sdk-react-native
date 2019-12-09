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
  
}
