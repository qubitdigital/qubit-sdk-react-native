//
//  QBLogLevel+FromString.swift
//  QubitSDKModule
//
//  Created by Michał Balawajder on 09/12/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import QubitSDK

extension QBLogLevel {
    
    static func logLevel(from string: String) -> QBLogLevel {
        switch string {
        case "SILENT":
          return .disabled
        case "ERROR":
          return .error
        case "WARN":
          return .warning
        case "INFO":
          return .info
        case "DEBUG":
          return .debug
        case "VERBOSE":
          return .verbose
        default:
          return .warning
        }
    }
    
}

extension Encodable {
    var dictionary: [String: Any]? {
      guard let data = try? JSONEncoder().encode(self) else { return nil }
      return (try? JSONSerialization.jsonObject(with: data, options: .allowFragments)).flatMap { $0 as? [String: Any] }
    }
}
