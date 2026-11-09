import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import Search from '../../src/Search.web'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'

const screenProps = {
  navigation: navigation,
  id: 'Search'
}

const feature = loadFeature('./__tests__/features/searchweb-scenario.feature')

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to search', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search

    given('I am a User loading search', () => {
      SearchWrapper = shallow(<Search {...screenProps} />)
    })

    then('I can leave the screen with out errors', () => {
      expect(SearchWrapper).toBeTruthy()
    })
  })
})
