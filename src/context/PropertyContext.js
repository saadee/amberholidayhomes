/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */

//---------------------------------------------------------------------
// React, Next and other third-party modules imports
//---------------------------------------------------------------------
import PropTypes from 'prop-types';
import { where, query, getDocs, collection } from 'firebase/firestore';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { getMaxGuests } from 'src/utils/common';
import { useBoolean } from 'src/hooks/use-boolean';

import { usePathname, useRouter } from 'src/routes/hooks';
import { DB } from './AuthContext';

export const PropertyContext = createContext({});
export const usePropertyContext = () => useContext(PropertyContext);

// ----------------------------------------------------------------------

export const PropertyProvider = ({ children }) => {
  const pathname = usePathname();
  const isPropertiesLoading = useBoolean();
  const isListingLoading = useBoolean(true);
  const openLoginModal = useBoolean(false);
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

  console.log('filterProperties?.length', filterProperties?.length);

  //--------------------------------------------------------------------
  // Side Effects
  //--------------------------------------------------------------------
  useEffect(() => {
    // get the Property Owners
    getAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (pathname !== '/') await getAvailableProperties();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pathname]);

  //--------------------------------------------------------------------
  // Callbacks
  //--------------------------------------------------------------------

  const getAllProperties = useCallback(async () => {
    // Reference to the 'properties' collection
    const propertyCollection = collection(DB, 'property');

    // Query to get all documents ordered by 'createdAt' in descending order
    const q = query(propertyCollection);

    try {
      if (filters?.dates[0] === null && filters?.dates[1] === null) {
        console.log('Getting all properties');
        isPropertiesLoading.onToggle();
        const querySnapshot = await getDocs(q);

        const data = [];

        querySnapshot.forEach((d) => {
          data.push({ id: d.id, ...d.data() });
        });

        const Shuffled = data;

        setProperties(Shuffled);
        isPropertiesLoading.onToggle();
      }
    } catch (error) {
      isPropertiesLoading.onToggle();
      console.error('Error getting documents: ', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-shadow
  const filterOutBasedonSpecs = ({ propertiesToDisplay, filters }) => {
    const { bath, rooms, location, propertyType, guests } = filters;

    const adultGuests = guests?.adults || 0;
    const childGuests = guests?.children || 0;
    // const totalGuests = adultGuests + childGuests;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAvailableProperties = async () => {
    try {
      if (!isPropertiesLoading.value && properties?.length > 0) {
        console.log('Get Available Property');

        const propertiesToDisplay = properties;
        let reservedPropertyIds = {};
        let availableProperties = [];

        console.log(checkInDate, checkOutDate);

        if (checkInDate !== null && checkOutDate !== null) {
          console.log('fetching from Firebase');
          const reservationsRef = collection(DB, 'reservations');
          const reservationsQuery = query(
            reservationsRef,
            where('checkIn', '<', checkOutDate),
            where('checkOut', '>', checkInDate)
          );

          isListingLoading.onTrue();

          const reservationDocs = await getDocs(reservationsQuery);
          const overlappingReservations = reservationDocs.docs.map((doc) => doc.data());
          // overlappingReservations = overlappingReservations.filter(
          //   (reservation) => reservation.checkIn < checkOutDate && reservation.checkOut > checkInDate
          // );

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
      }
      return null;
    } catch (error) {
      console.log('Error in getting Available properties', error);
      return null;
    }
  };

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
      openLoginModal,
    }),
    [properties, filterProperties, isListingLoading, propertyToView, filters, openLoginModal]
  );
  return <PropertyContext.Provider value={memoizedValue}>{children}</PropertyContext.Provider>;
};

PropertyProvider.propTypes = {
  children: PropTypes.node,
};
