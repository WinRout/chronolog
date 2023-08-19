//
//  LiveActivityModuleHeader.m
//  PixelProject
//
//  Created by Nikitas Tsinnas on 14/8/23.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveActivity, NSObject)

RCT_EXTERN_METHOD(startActivity:(NSString)startDate)
RCT_EXTERN_METHOD(pauseActivity)
RCT_EXTERN_METHOD(restartActivity)
RCT_EXTERN_METHOD(endActivity)

@end
