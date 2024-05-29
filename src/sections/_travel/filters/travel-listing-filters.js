import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import FilterTime from './filter-time';
import FilterBath from './filter-bath';
import FilterRoom from './filter-room';
import FilterGuests from './filter-guests';
import FilterLocation from './filter-location';
import FilterPropertyType from './filter-property-type';

// ----------------------------------------------------------------------

export default function TravelListingFilters({ sx, ...other }) {
  const [departureDay, setDepartureDay] = useState([null, null]);

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });

  const handleChangeDepartureDay = useCallback((newValue) => {
    setDepartureDay(newValue);
  }, []);

  const handleIncrementGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setGuests({ ...guests, children: guests.children + 1 });
      } else {
        setGuests({ ...guests, adults: guests.adults + 1 });
      }
    },
    [guests]
  );

  const handleDecreaseGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setGuests({ ...guests, children: guests.children - 1 });
      } else {
        setGuests({ ...guests, adults: guests.adults - 1 });
      }
    },
    [guests]
  );

  return (
    <Stack
      spacing={1}
      alignItems={{ md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      <FilterLocation />
      <Divider flexItem orientation="vertical" />
      <FilterPropertyType />
      <Divider flexItem orientation="vertical" />
      <FilterRoom />
      <Divider flexItem orientation="vertical" />
      <FilterBath />

      <Divider flexItem orientation="vertical" />

      <FilterTime
        departureDay={departureDay}
        onChangeDepartureDay={handleChangeDepartureDay}
        sx={{ width: '100%' }}
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
