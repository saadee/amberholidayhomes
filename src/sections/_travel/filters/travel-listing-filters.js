/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { usePropertyContext } from 'src/context/PropertyContext';

import FilterBath from './filter-bath';
import FilterRoom from './filter-room';
import FilterTime from './filter-time';
import FilterGuests from './filter-guests';
import FilterLocation from './filter-location';
import FilterPropertyType from './filter-property-type';

// ----------------------------------------------------------------------

export default function TravelListingFilters({ sx, ...other }) {
  const { setFilterProperties, properties, filters, setFilters } = usePropertyContext();

  const { bath, rooms, propertyType, location, dates, guests } = filters;

  useEffect(() => {
    setFilterProperties(properties);
  }, [properties, setFilterProperties]);

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
      <FilterRoom onChange={(e, value) => setFilters({ ...filters, rooms: value })} value={rooms} />
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
