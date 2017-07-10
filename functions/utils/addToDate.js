'use strict';

const addToDate = (timestamp, intervalType, value) => {
  const originalTimestamp = new Date(timestamp);

  switch(intervalType) {
    case 'd':
      originalTimestamp.setDate(originalTimestamp.getDate() + value);
      break;
    case 'w':
      const numberOfDays = value * 7
      originalTimestamp.setDate(originalTimestamp.getDate() + numberOfDays);
      break;
    default:
      throw new Error('Invalid intervalType. Expected d or w but ' + intervalType + ' was given');
  }

  return originalTimestamp;
};

module.exports = addToDate;
