/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { where, query, getDocs, collection } from 'firebase/firestore';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { DB } from 'src/context/AuthContext';
import { usePropertyContext } from 'src/context/PropertyContext';

import FilterRoom from './filter-room';
import FilterTime from './filter-time';
import FilterBath from './filter-bath';
import FilterGuest from './filter-guest';
import FilterLocation from './filter-location';
import FilterPropertyType from './filter-property-type';

// ----------------------------------------------------------------------

export default function TravelListingFilters({ sx, ...other }) {
  const { setFilterProperties, properties, isListingLoading } = usePropertyContext();

  const [filters, setFilters] = useState({
    bath: null,
    rooms: null,
    propertyType: null,
    location: null,
    guests: null,
    dates: [null, null],
  });

  const { bath, rooms, propertyType, location, dates, guests } = filters;
  const checkInDate = dates?.[0]
    ? new Date(dates?.[0]).setHours(15, 0, 0, 0) // 3pm Noon
    : null;

  const checkOutDate = dates?.[1]
    ? new Date(dates?.[1]).setHours(12, 0, 0, 0) // 12pm Noon
    : null;
  // Initialize Firestore

  async function getAvailableProperties() {
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
  }

  const filterOutBasedonSpecs = ({ propertiesToDisplay, filters }) => {
    const { bath, rooms, location, propertyType, guests } = filters;
    if (bath) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.bath >= bath);
    if (rooms) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.rooms >= rooms);
    if (location) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.area === location);
    if (guests) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.guests >= guests);
    if (propertyType)
      propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.propertyType === propertyType);
    return propertiesToDisplay;
  };

  useEffect(() => {
    setFilterProperties(properties);
  }, [properties, setFilterProperties]);

  useEffect(() => {
    (async () => {
      await getAvailableProperties({});
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // const handleChangeDepartureDay = useCallback((newValue) => {
  //   setDepartureDay(newValue);
  // }, []);

  // const handleIncrementGuests = useCallback(
  //   (guest) => {
  //     if (guest === 'children') {
  //       setGuests({ ...guests, children: guests.children + 1 });
  //     } else {
  //       setGuests({ ...guests, adults: guests.adults + 1 });
  //     }
  //   },
  //   [guests]
  // );

  // const handleDecreaseGuests = useCallback(
  //   (guest) => {
  //     if (guest === 'children') {
  //       setGuests({ ...guests, children: guests.children - 1 });
  //     } else {
  //       setGuests({ ...guests, adults: guests.adults - 1 });
  //     }
  //   },
  //   [guests]
  // );

  return (
    <Stack
      spacing={1}
      alignItems={{ md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      <FilterLocation
        onChange={(e, value) => setFilters({ ...filters, location: value })}
        value={location}
      />
      <Divider flexItem orientation="vertical" />
      <FilterPropertyType
        onChange={(e, value) => setFilters({ ...filters, propertyType: value })}
        value={propertyType}
      />
      <Divider flexItem orientation="vertical" />
      <FilterRoom onChange={(e, value) => setFilters({ ...filters, room: value })} value={rooms} />
      <Divider flexItem orientation="vertical" />
      <FilterBath onChange={(e, value) => setFilters({ ...filters, bath: value })} value={bath} />

      <Divider flexItem orientation="vertical" />

      <FilterTime
        sx={{ width: '100%' }}
        onChange={(value) => setFilters({ ...filters, dates: value })}
        value={dates}
      />

      <Divider flexItem orientation="vertical" />

      <FilterGuest
        onChange={(e, value) => setFilters({ ...filters, guests: value })}
        value={guests}
      />
    </Stack>
  );
}

TravelListingFilters.propTypes = {
  sx: PropTypes.object,
};
