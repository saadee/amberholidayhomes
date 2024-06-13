import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { usePropertyContext } from 'src/context/PropertyContext';

import FilterTime from './filter-time';
import FilterGuests from './filter-guests';
import FilterLocation from './filter-location';

// ----------------------------------------------------------------------

export default function TravelFilters({ sx, ...other }) {
  const router = useRouter();

  const { setFilters, filters } = usePropertyContext();
  const { location, dates, guests } = filters;

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

  return (
    <Stack
      spacing={2.5}
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

      <FilterTime
        onChange={(value) => setFilters({ ...filters, dates: value })}
        value={dates}
        sx={{
          color: 'white',
          width: '100%',
          '& .MuiInputBase-input': {
            color: 'white', // Change placeholder color here
          },
          '& .MuiFormLabel-root': {
            color: 'white', // Change placeholder color here
          },
        }}
      />

      <Divider flexItem orientation="vertical" />

      <FilterGuests
        guests={guests}
        onDecreaseGuests={handleDecreaseGuests}
        onIncrementGuests={handleIncrementGuests}
      />

      <Button
        onClick={() => router.push(paths.listings)}
        size="large"
        color="secondary"
        variant="contained"
        sx={{
          px: 0,
          flexShrink: 0,
          minWidth: { xs: 1, md: 48 },
        }}
      >
        <Iconify icon="carbon:search" />
      </Button>
    </Stack>
  );
}

TravelFilters.propTypes = {
  sx: PropTypes.object,
};
