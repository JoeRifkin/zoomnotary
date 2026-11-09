import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import Radar from "react-native-radar";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Geofence from "../../src/Geofence";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Geofence",
};

jest.mock("react-native-radar", () => {
  return {
    setUserId: jest.fn(),
    setLogLevel: jest.fn(),
    setMetadata: jest.fn(),
    startTrip: jest.fn(),
  };
});

const feature = loadFeature("./__tests__/features/Geofence-scenario.feature");

defineFeature(feature, (test) => {
  const waitForPromises = () => new Promise(setImmediate);

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to Geofence", ({ given, when, then }) => {
    let geofenceBlock: ShallowWrapper;
    let instance: Geofence;

    given("I am a User loading Geofence", () => {
      Radar.on = (eventType: string, callback: Function) => {
        callback({ location: { latitude: 22.22 } });
      };
      Radar.getLocation = () => ({ latitude: 22.22 });
      Radar.requestPermissions = jest.fn();
      Radar.getPermissionsStatus = () => "GRANTED";

      Radar.trackOnce = () => ({ latitude: 11 });
      Radar.startTrackingContinuous = () => ({ latitude: 11 });
      Radar.searchPlaces = () => ({ latitude: 11 });
      Radar.autocomplete = () => ({ latitude: 11 });
      Radar.geocode = () => ({ latitude: 11 });
      Radar.reverseGeocode = () => ({ latitude: 11 });
      Radar.ipGeocode = () => ({ latitude: 11 });
      Radar.getDistance = () => ({ latitude: 11 });
      Radar.getMatrix = () => ({ latitude: 11 });
      Radar.mockTracking = () => ({ latitude: 11 });
      Radar.completeTrip = () => ({ latitude: 11 });
      Radar.searchGeofences = () => ({ latitude: 11 });

      geofenceBlock = shallow(<Geofence {...screenProps} />);
    });

    when("I navigate to the Geofence", () => {
      instance = geofenceBlock.instance() as Geofence;
    });

    then("Geofence will display my location on the screen", async () => {
      await waitForPromises();
      const clientLocationTextElement = geofenceBlock.findWhere(
        (node) => node.prop("testID") === "txtLocation"
      );
      const locationStringOnTheScreen = clientLocationTextElement
        .render()
        .text();


      expect(locationStringOnTheScreen.indexOf("22.22") > 0).toEqual(true);
    });
  });

  test("User navigates to Geofence with api errors", ({
    given,
    when,
    then,
    and,
  }) => {
    let geofenceBlock: ShallowWrapper;
    let instance: Geofence;

    given("I am a User loading Geofence", () => {
      const errorThrower = () => {
        throw new Error();
      };
      Radar.on = errorThrower;
      Radar.getLocation = errorThrower;
      Radar.requestPermissions = errorThrower;
      Radar.getPermissionsStatus = errorThrower;
      Radar.trackOnce = errorThrower;
      Radar.startTrackingContinuous = errorThrower;
      Radar.searchPlaces = errorThrower;
      Radar.autocomplete = errorThrower;
      Radar.geocode = errorThrower;
      Radar.reverseGeocode = errorThrower;
      Radar.ipGeocode = errorThrower;
      Radar.getDistance = errorThrower;
      Radar.getMatrix = errorThrower;
      Radar.mockTracking = errorThrower;
      Radar.completeTrip = errorThrower;
      Radar.searchGeofences = errorThrower;

      geofenceBlock = shallow(<Geofence {...screenProps} />);
    });

    when("I navigate to the Geofence", () => {
      instance = geofenceBlock.instance() as Geofence;
    });

    then("Geofence will load", async () => {
      await waitForPromises();
      expect(geofenceBlock).toBeTruthy();
    });

    and("will not display my location on the screen", () => {
      const clientLocationTextElement = geofenceBlock.findWhere(
        (node) => node.prop("testID") === "txtLocation"
      );
      const locationStringOnTheScreen = clientLocationTextElement
        .render()
        .text();

      expect(locationStringOnTheScreen.indexOf("22.22") > 0).toEqual(false);
    });
  });
});
