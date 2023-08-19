//
//  LiveActivityLiveActivity.swift
//  LiveActivity
//
//  Created by Nikitas Tsinnas on 14/8/23.
//

import Foundation
import ActivityKit
import WidgetKit
import SwiftUI

struct LiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
      var leadingName: String
      var startTime: Date
      var isPaused: Bool = false
      var stopTime: Date
      var elapsedTime: TimeInterval = 0
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct LiveActivityLiveActivity: Widget {
  
  func formatTimeInterval(_ timeInterval: TimeInterval) -> String {
      let formatter = DateComponentsFormatter()
      formatter.allowedUnits = [.hour, .minute, .second]
      formatter.unitsStyle = .brief
      
      return formatter.string(from: timeInterval) ?? ""
  }

  func formatRelativeTime(_ date: Date) -> String {
      let formatter = RelativeDateTimeFormatter()
      formatter.unitsStyle = .full
      
      return formatter.localizedString(for: date, relativeTo: Date())
  }

  
    
  
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
          VStack (alignment: .center){
              Text(context.state.leadingName).font(.headline).fontWeight(Font.Weight.light)
              if context.state.isPaused {
                Text("Paused").font(.headline)
                Text(formatTimeInterval(context.state.elapsedTime)).font(.headline).fontWeight(Font.Weight.bold)
                  } else {
                    Text(context.state.startTime, style: .relative)
                      .font(.headline)
                      .fontWeight(Font.Weight.bold)
                      .italic()
                      .frame(maxWidth: .infinity, alignment: .center)
                  }
            }.onAppear {
              // Set up a timer to trigger an update every second
              Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
                  WidgetCenter.shared.reloadTimelines(ofKind: "LiveActivityLiveActivity")
              }
          }
          .activityBackgroundTint(Color.white)
          .activitySystemActionForegroundColor(Color.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                  Text(context.state.leadingName)
                }
                DynamicIslandExpandedRegion(.trailing) {
                  if context.state.isPaused {
                          Text("Paused")
                          Text(formatTimeInterval(context.state.elapsedTime))
                      } else {
                        Text(context.state.startTime, style: .relative)
                      }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    
                    // more content
                }
            } compactLeading: {
              Text(context.state.leadingName)
            } compactTrailing: {
              if context.state.isPaused {
                      Text("Paused")
                      Text(formatTimeInterval(context.state.elapsedTime))
                  } else {
                    Text(context.state.startTime, style: .relative)
                  }
            } minimal: {
                //Text("Min")
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

//struct LiveActivityLiveActivity_Previews: PreviewProvider {
//    static let attributes = LiveActivityAttributes(name: "Me")
//    static let contentState = LiveActivityAttributes.ContentState(value: 3)
//
//    static var previews: some View {
//        attributes
//            .previewContext(contentState, viewKind: .dynamicIsland(.compact))
//            .previewDisplayName("Island Compact")
//        attributes
//            .previewContext(contentState, viewKind: .dynamicIsland(.expanded))
//            .previewDisplayName("Island Expanded")
//        attributes
//            .previewContext(contentState, viewKind: .dynamicIsland(.minimal))
//            .previewDisplayName("Minimal")
//        attributes
//            .previewContext(contentState, viewKind: .content)
//            .previewDisplayName("Notification")
//    }
//}
