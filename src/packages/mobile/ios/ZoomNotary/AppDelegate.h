#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "RNGoogleSignin.h"
#import <UserNotifications/UNUserNotificationCenter.h>
#import <React/RCTLinkingManager.h>
#import "RNAppAuthAuthorizationFlowManager.h"

@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate, RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate> authorizationFlowManagerDelegate;

@end
