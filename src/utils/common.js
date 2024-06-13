import { Timestamp } from 'firebase/firestore';

import { _propertyType } from 'src/_mock';

export function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  // eslint-disable-next-line eqeqeq
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// eslint-disable-next-line consistent-return
export const getNightsFromDates = (dates) => {
  const checkIn = dates?.[0];
  const checkOut = dates?.[1];
  const checkInFormatted = checkIn instanceof Timestamp ? checkIn?.toDate() : new Date(checkIn);
  const checkOutFormatted = checkOut instanceof Timestamp ? checkOut?.toDate() : new Date(checkOut);

  if (checkInFormatted && checkOutFormatted) {
    // Convert dates to timestamps
    const checkInTimestamp = checkInFormatted?.getTime();
    const checkOutTimestamp = checkOutFormatted?.getTime();

    // Calculate the difference in milliseconds
    const timeDiff = checkOutTimestamp - checkInTimestamp;

    // Convert milliseconds to days
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const numberOfNights = Math.ceil(timeDiff / oneDayInMs);
    return numberOfNights;
  }
};

export const getMaxGuests = (propertyType, isVilla, beds) => {
  if (isVilla) {
    if ((propertyType === _propertyType[4] || propertyType === _propertyType[3]) && beds <= 4)
      return { adults: 8, children: 3 };
    if (propertyType === _propertyType[4] && beds <= 5) return { adults: 10, children: 4 };
  } else {
    if (propertyType === _propertyType[0] || propertyType === _propertyType[5])
      return { adults: 2, children: 1 };
    if (propertyType === _propertyType[1]) return { adults: 4, children: 2 };
    if (propertyType === _propertyType[2]) return { adults: 6, children: 3 };
  }
  return { adults: 0, children: 0 }; // Default case
};
