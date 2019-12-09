//
//  QBExperienceEntity+NewInstance.swift
//  QubitSDKModule
//
//  Created by Michał Balawajder on 09/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import QubitSDK

extension QBExperienceEntity {
  
  convenience init?(callback: String) {
      //This is stub Entity just to make method experienceShown() possible to call. We only need callback string here, the rest of fields can be empty or defaults.
      //FIXME Reflecting here private SDK fields, so this is volatile
      let coder = NSCoder()
      coder.encode(callback, forKey: "callback")
      coder.encode(false, forKey: "isControl")
      coder.encode(Int.max, forKey: "id")
      coder.encode(Int.max, forKey: "variation")
      coder.encode([String:Any](), forKey: "payload")
      self.init(coder: coder)
  }
  
}
