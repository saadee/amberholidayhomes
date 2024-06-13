/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */

//---------------------------------------------------------------------
// React, Next and other third-party modules imports
//---------------------------------------------------------------------
import PropTypes from 'prop-types';
import { where, query, getDocs, collection } from 'firebase/firestore';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { _propertyType } from 'src/_mock';
import { shuffleArray } from 'src/utils/common';
import { useBoolean } from 'src/hooks/use-boolean';

import { DB } from './AuthContext';

export const PropertyContext = createContext({});
export const usePropertyContext = () => useContext(PropertyContext);

// ----------------------------------------------------------------------

export const PropertyProvider = ({ children }) => {
  const isPropertiesLoading = useBoolean();
  const isListingLoading = useBoolean(true);

  // ---------------------------------------------------------------------
  //  Local states
  // ---------------------------------------------------------------------
  const [properties, setProperties] = useState([]);
  const [filterProperties, setFilterProperties] = useState([]);
  const [propertyToView, setPropertyToView] = useState({});
  const [filters, setFilters] = useState({
    bath: null,
    rooms: null,
    propertyType: null,
    location: null,
    guests: {
      adults: 0,
      children: 0,
    },
    dates: [null, null],
  });

  const { dates } = filters;

  const checkInDate = dates?.[0]
    ? new Date(dates?.[0]).setHours(15, 0, 0, 0) // 3pm Noon
    : null;

  const checkOutDate = dates?.[1]
    ? new Date(dates?.[1]).setHours(12, 0, 0, 0) // 12pm Noon
    : null;

  //--------------------------------------------------------------------
  // Side Effects
  //--------------------------------------------------------------------
  useEffect(() => {
    // get the Property Owners
    getAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------------------------------------
  // Callbacks
  //--------------------------------------------------------------------

  const getAllProperties = async () => {
    isPropertiesLoading.onToggle();
    // Reference to the 'properties' collection
    const propertyCollection = collection(DB, 'property');

    // Query to get all documents ordered by 'createdAt' in descending order
    const q = query(propertyCollection);

    try {
      const querySnapshot = await getDocs(q);

      const data = [];

      querySnapshot.forEach((d) => {
        data.push({ id: d.id, ...d.data() });
      });

      const Shuffled = shuffleArray(data);

      setProperties(Shuffled);
      isPropertiesLoading.onToggle();
    } catch (error) {
      isPropertiesLoading.onToggle();
      console.error('Error getting documents: ', error);
    }
  };

  // eslint-disable-next-line no-shadow
  const filterOutBasedonSpecs = ({ propertiesToDisplay, filters }) => {
    const { bath, rooms, location, propertyType, guests } = filters;

    const adultGuests = guests?.adults || 0;
    const childGuests = guests?.children || 0;
    // const totalGuests = adultGuests + childGuests;

    const getMaxGuests = (propertyType, isVilla, beds) => {
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

    if (bath) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.bath >= bath);
    if (rooms) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.rooms >= rooms);
    if (location) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.area === location);

    if (propertyType)
      propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.propertyType === propertyType);

    propertiesToDisplay = propertiesToDisplay?.filter((e) => {
      const isVilla = e?.propertyType.includes('Villa');
      const { adults, children } = getMaxGuests(e?.propertyType, isVilla, e?.beds?.length);
      return adultGuests <= adults && childGuests <= children;
    });

    return propertiesToDisplay;
  };

  const getAvailableProperties = useCallback(async () => {
    try {
      const propertiesToDisplay = properties;
      let reservedPropertyIds = {};
      let availableProperties = [];

      if (checkInDate && checkOutDate) {
        const checkInTimestamp = new Date(checkInDate);
        const checkOutTimestamp = new Date(checkOutDate);

        const reservationsRef = collection(DB, 'reservations');
        const reservationsQuery = query(
          reservationsRef,
          where('checkIn', '<', checkOutTimestamp),
          where('checkOut', '>', checkInTimestamp)
        );

        isListingLoading.onTrue();

        const reservationDocs = await getDocs(reservationsQuery);
        const overlappingReservations = reservationDocs.docs.map((doc) => doc.data());
        isListingLoading.onFalse();

        reservedPropertyIds = new Set(
          overlappingReservations.map((reservation) => reservation.propertyId)
        );
        const filteredProperties = filterOutBasedonSpecs({
          propertiesToDisplay,
          filters,
        });
        availableProperties = filteredProperties.filter(
          (property) => !reservedPropertyIds.has(property.id)
        );
      } else {
        const filteredProperties = filterOutBasedonSpecs({
          propertiesToDisplay,
          filters,
        });
        availableProperties = filteredProperties;
      }

      // Perform Firebase operations here before returning
      // For example, if you need to update something in Firebase, do it here
      setFilterProperties(availableProperties);
      return availableProperties;
    } catch (error) {
      console.log('Error in getting Available properties', error);
      return null;
    }
  }, [checkInDate, checkOutDate, filters, isListingLoading, properties]);

  // --------------------------------------------------------------------
  // Return
  // --------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      properties,
      setProperties,
      filterProperties,
      setFilterProperties,
      isListingLoading,
      propertyToView,
      setPropertyToView,
      filters,
      setFilters,
      getAvailableProperties,
    }),
    [
      properties,
      filterProperties,
      isListingLoading,
      propertyToView,
      filters,
      getAvailableProperties,
    ]
  );
  return <PropertyContext.Provider value={memoizedValue}>{children}</PropertyContext.Provider>;
};

PropertyProvider.propTypes = {
  children: PropTypes.node,
};
