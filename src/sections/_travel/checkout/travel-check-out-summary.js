import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { getNightsFromDates } from 'src/utils/common';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function TravelCheckOutSummary({
  tour,
  guestsToBooked,
  dates,
  isSubmitting,
  onDecreaseGuests,
  onIncrementGuests,
  onChangeDepartureDay,
  propertyToView,
}) {
  const { images, title, rentPerNight, rooms, bath, guests } = propertyToView;

  const totalAmount = fCurrency(getNightsFromDates(dates) * rentPerNight);

  const checkInDate = fDate(dates[0]);
  const checkOutDate = fDate(dates[1]);

  return (
    <Card>
      <Box
        sx={{
          p: 4,
          pb: 0,
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
        }}
      >
        <Image alt={title} src={images[0]} ratio="1/1" sx={{ borderRadius: 2 }} />

        <Stack>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {title}
          </Typography>

          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

            <Box sx={{ typography: 'h6' }}>{Number.isInteger(56789)}</Box>

            <Link variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(2343)} reviews)
            </Link>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 2.5 }} />

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.disabled' }}
            >
              <Iconify icon="mdi:users" width={25} sx={{ mr: 1 }} /> {guests}
            </Stack>
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.disabled' }}
            >
              <Iconify icon="material-symbols:bed" width={25} sx={{ mr: 1 }} /> {rooms}
            </Stack>
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.disabled' }}
            >
              <Iconify icon="solar:bath-bold" width={25} sx={{ mr: 1 }} /> {bath}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Stack sx={{ p: 4, pb: 3 }}>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            p: 2.5,
            borderRadius: 2,
            color: 'text.disabled',
            bgcolor: 'background.neutral',
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ width: 0.2 }}>
            <Iconify icon="carbon:events" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Guests</Typography>
              <Typography variant="body" color="text.primary">
                {guestsToBooked.adults + guestsToBooked.children}
              </Typography>
            </Stack>
          </Stack>

          <Divider flexItem sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon="carbon:calendar" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Check In & Check Out</Typography>
              <Typography variant="body" color="text.primary">
                {checkInDate} - {checkOutDate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 3, mb: 2 }}
        >
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Service charge
          </Typography>
          <Typography variant="body2">{fCurrency(price)}</Typography>
        </Stack>

        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Discount
          </Typography>
          <Typography variant="body2">-</Typography>
        </Stack> */}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total</Typography>
          <Typography variant="h5">{totalAmount}</Typography>
        </Stack>

        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          color="inherit"
          loading={isSubmitting}
        >
          Complete Booking
        </LoadingButton>
      </Stack>
    </Card>
  );
}

TravelCheckOutSummary.propTypes = {
  isSubmitting: PropTypes.bool,
  onDecreaseGuests: PropTypes.func,
  onIncrementGuests: PropTypes.func,
  onChangeDepartureDay: PropTypes.func,
  dates: PropTypes.instanceOf(Date),
  guestsToBooked: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
  }),
  propertyToView: PropTypes.object,
  tour: PropTypes.shape({
    slug: PropTypes.string,
    price: PropTypes.number,
    coverUrl: PropTypes.string,
    ratingNumber: PropTypes.number,
    totalReviews: PropTypes.number,
    tourGuide: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};
