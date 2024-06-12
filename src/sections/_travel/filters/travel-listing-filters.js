/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { where, query, getDocs, collection } from 'firebase/firestore';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { _propertyType } from 'src/_mock';
import { DB } from 'src/context/AuthContext';
import { usePropertyContext } from 'src/context/PropertyContext';

import FilterBath from './filter-bath';
import FilterRoom from './filter-room';
import FilterTime from './filter-time';
import FilterGuests from './filter-guests';
import FilterLocation from './filter-location';
import FilterPropertyType from './filter-property-type';

// ----------------------------------------------------------------------

export default function TravelListingFilters({ sx, ...other }) {
  const { setFilterProperties, properties, isListingLoading, filters, setFilters } =
    usePropertyContext();

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

    const childGuests = guests?.children;
    const adultGuests = guests?.adults;

    const totalGuests = guests.adults + guests.children;
    console.log('totalGuests', totalGuests);

    if (bath) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.bath >= bath);
    if (rooms) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.rooms >= rooms);
    if (location) propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.area === location);

    // if (adultGuests)
    // propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.guests >= totalGuests);
    if (propertyType)
      propertiesToDisplay = propertiesToDisplay?.filter((e) => e?.propertyType === propertyType);

    if (childGuests) {
      // eslint-disable-next-line consistent-return, array-callback-return
      propertiesToDisplay = propertiesToDisplay?.filter((e) => {
        if (adultGuests <= 2 && totalGuests <= 2)
          return (
            e?.propertyType === _propertyType[0] || // 1 BR
            e?.propertyType === _propertyType[1] || // 2 BR
            e?.propertyType === _propertyType[2] || // 3 BR
            e?.propertyType === _propertyType[3] || // 4 BR
            e?.propertyType === _propertyType[4] || // Villa
            e?.propertyType === _propertyType[5] // Studio only
          );

        if (childGuests <= 1 && adultGuests <= 2 && totalGuests <= 3)
          return (
            e?.propertyType === _propertyType[0] || // 1 BR
            e?.propertyType === _propertyType[1] || // 2 BR
            e?.propertyType === _propertyType[2] // 3 BR
          );

        if (childGuests <= 2 && adultGuests <= 4 && totalGuests <= 6)
          return (
            e?.propertyType === _propertyType[1] || // 2 BR
            e?.propertyType === _propertyType[2] || // 3 BR
            e?.propertyType === _propertyType[3] || // 4 BR
            e?.propertyType === _propertyType[4] // Villa
          );
        if (childGuests <= 3 && adultGuests <= 6 && totalGuests <= 9)
          return (
            e?.propertyType === _propertyType[2] || // 3 BR
            e?.propertyType === _propertyType[3] // 4 BR
            // e?.propertyType === _propertyType[4] // Villa
          );
        if (childGuests <= 4 && adultGuests <= 8 && totalGuests <= 12)
          return (
            // e?.propertyType === _propertyType[2] || // 3 BR
            // e?.propertyType === _propertyType[3] || // 4 BR
            e?.propertyType === _propertyType[4] // Villa
          );
      });
    }

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

  // const [guests, setGuests] = useState({
  //   adults: 0,
  //   children: 0,
  // });

  const handleIncrementGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setFilters({
          ...filters,
          guests: { ...filters.guests, children: filters.guests.children + 1 },
        });
      } else {
        setFilters({
          ...filters,
          guests: { ...filters.guests, adults: filters.guests.adults + 1 },
        });
      }
    },
    [filters, setFilters]
  );

  const handleDecreaseGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setFilters({
          ...filters,
          guests: { ...filters.guests, children: filters.guests.children - 1 },
        });
      } else {
        setFilters({
          ...filters,
          guests: { ...filters.guests, adults: filters.guests.adults - 1 },
        });
      }
    },
    [filters, setFilters]
  );

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

      <FilterGuests
        guests={guests}
        onDecreaseGuests={handleDecreaseGuests}
        onIncrementGuests={handleIncrementGuests}
      />
    </Stack>
  );
}

TravelListingFilters.propTypes = {
  sx: PropTypes.object,
};
