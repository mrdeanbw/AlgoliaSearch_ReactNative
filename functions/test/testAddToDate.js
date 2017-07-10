'use strict';

const chai = require('chai');
const addToDate = require('../utils/addToDate');

describe('Date interval additions', () => {

  it ('DateTime stamp + 1 weeks', () => {
    const originalDateTime = new Date('2017-05-23T00:20:00.000Z')
    const expectedDateTime = new Date('2017-05-30T00:20:00.000Z')

    const interval = 'w'
    const intervalValue = 1

    chai.assert.equal(originalDateTime, expectedDateTime);
  });

  it ('DateTime stamp + 2 days', () => {
    const originalDateTime = new Date('2017-05-23T00:20:00.000Z')
    const expectedDateTime = new Date('2017-05-25T00:20:00.000Z')

    const interval = 'd'
    const intervalValue = 2

    chai.assert.equal(originalDateTime, expectedDateTime);
  });

});
