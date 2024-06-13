import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
import { fCurrency } from 'src/utils/format-number';
import { getNightsFromDates } from 'src/utils/common';
import { usePropertyContext } from 'src/context/PropertyContext';

import FilterTime from '../filters/filter-time';
import FilterGuests from '../filters/filter-guests';

// ----------------------------------------------------------------------

export default function TravelTourDetailsReserveForm({ tour }) {
  // const router = useRouter();
  const { setFilters, filters } = usePropertyContext();
  const { dates, guests } = filters;

  const { priceSale, rentPerNight } = tour;

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

  const handleClickReserve = useCallback(() => {
    // router.push(paths.checkout);
  }, []);

  const totalAmount = fCurrency(getNightsFromDates(dates) * rentPerNight);

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          {priceSale > 0 && (
            <Box sx={{ color: 'grey.500', textDecoration: 'line-through', mr: 1 }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          {fCurrency(rentPerNight)}
          <Typography variant="body1" component="span" sx={{ color: 'text.disabled', ml: 1 }}>
            /Night
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Box
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >
            <FilterTime
              sx={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, dates: value })}
              value={dates}
            />
          </Box>

          <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >
            <FilterGuests
              guests={guests}
              onDecreaseGuests={handleDecreaseGuests}
              onIncrementGuests={handleIncrementGuests}
            />
          </Box>
        </Stack>

        {/* <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Service charge
          </Typography>
          <Typography variant="body2">{fCurrency(priceSale) || '-'}</Typography>
        </Stack>

        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Discount
          </Typography>
          <Typography variant="body2"> - </Typography>
        </Stack> */}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total</Typography>
          <Typography variant="h5">{totalAmount}</Typography>
        </Stack>

        <Button size="large" variant="contained" color="inherit" onClick={handleClickReserve}>
          Reserve
        </Button>
      </Stack>
    </Card>
  );
}

TravelTourDetailsReserveForm.propTypes = {
  tour: PropTypes.object,
};
