'use strict';

const chai = require('chai');

const addToDate = require('../utils/addToDate');

describe('Date interval additions', () => {

  it ('DateTime stamp + 1 weeks', () => {
    const originalDateTime = new Date('2017-05-23T00:20:00.000Z');
    const expectedDateTime = new Date('2017-05-30T00:20:00.000Z');

    const intervalType = 'w';
    const intervalValue = 1;

    const calcDateTime = addToDate(originalDateTime, intervalType, intervalValue);
    chai.assert.equal(calcDateTime.getTime(), expectedDateTime.getTime());
  });

  it ('DateTime stamp + 2 days', () => {
    const originalDateTime = new Date('2017-05-23T00:20:00.000Z');
    const expectedDateTime = new Date('2017-05-25T00:20:00.000Z');

    const intervalType = 'd';
    const intervalValue = 2;

    const calcDateTime = addToDate(originalDateTime, intervalType, intervalValue);
    chai.assert.equal(calcDateTime.getTime(), expectedDateTime.getTime());
  });

  it ('Invalid intervalType to throw exception', () => {
    const originalDateTime = new Date();
    const intervalType = 'zz';
    const intervalValue = 2;

    chai.assert.throws(() => addToDate(originalDateTime, intervalType, intervalValue));
  });

});
