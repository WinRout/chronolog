//
//  LiveActivityModule.swift
//  PixelProject
//
//  Created by Nikitas Tsinnas on 14/8/23.
//

import Foundation
import ActivityKit

@objc(LiveActivity)
class LiveActivity: NSObject {
  
  let liveActivityAttributes = LiveActivityAttributes(name: "Chronolog")
  var liveActivityContentState = LiveActivityAttributes.ContentState(leadingName: "Chronolog", startTime: .now, stopTime: .now)
  
  @objc(startActivity:)
  func startActivity(_ startDate: NSString) {
    
    do {
      if #available(iOS 16.1, *) {
        let dateFormatter = DateFormatter()
        dateFormatter.locale = .init(identifier: "en_US_POSIX")
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        if let date = dateFormatter.date(from: startDate as String) {
          print("HEELO")
          print(date)
          liveActivityContentState.startTime = date
        }
        liveActivityContentState.isPaused = false
        let activity = try Activity<LiveActivityAttributes>.request(attributes: liveActivityAttributes, contentState: liveActivityContentState, pushType: nil)
        
        
      } else {
        print("Dynamic Island and Live Activities not supported")
      }
    } catch (let error) {
      print("error on starting activity")
    }
  }
  
  @objc(pauseActivity)
  func pauseActivity() {
    let currentTime = Date()
    liveActivityContentState.stopTime = currentTime
    liveActivityContentState.elapsedTime = currentTime.timeIntervalSince(liveActivityContentState.startTime)
    liveActivityContentState.isPaused = true
    Task {
      for activity in Activity<LiveActivityAttributes>.activities {
        await activity.update(using: liveActivityContentState)
      }
    }
  }
  
  @objc(restartActivity)
  func restartActivity() {
    let currentTime = Date()
    let timeInterval = liveActivityContentState.stopTime.timeIntervalSince(currentTime)
    liveActivityContentState.startTime = liveActivityContentState.startTime.addingTimeInterval(-timeInterval)
    liveActivityContentState.isPaused = false
    Task {
      for activity in Activity<LiveActivityAttributes>.activities {
        await activity.update(using: liveActivityContentState)
      }
    }
  }
  
  @objc(endActivity)
  func endActivity() {
    Task {
      for activity in Activity<LiveActivityAttributes>.activities {
        await activity.end(dismissalPolicy: .immediate)
      }
    }
  }
}
