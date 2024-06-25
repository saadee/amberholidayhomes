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
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function TravelCheckOutSummary({
  guestsToBooked,
  dates,
  isSubmitting,
  propertyToView,
}) {
  const { images, title, rooms, bath, guests } = propertyToView;

  const checkInDate = fDate(dates ? dates[0] : new Date());
  const checkOutDate = fDate(dates ? dates[1] : new Date());

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
        {images?.length > 0 && (
          <Image alt={title} src={images[0]} ratio="1/1" sx={{ borderRadius: 2 }} />
        )}

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
        <Stack spacing={2.5} direction={{ xs: 'column', sm: 'row' }}>
          <Stack direction="row" spacing={1.5}>
            <Iconify icon="carbon:calendar" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Check In & Check Out</Typography>
              <Typography variant="body" color="text.primary">
                {checkInDate} - {checkOutDate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider flexItem sx={{ borderStyle: 'dashed' }} />
      <Stack sx={{ p: 4, pb: 3 }}>
        <Stack spacing={2.5} direction={{ xs: 'column', sm: 'row' }}>
          <Stack direction="row" spacing={1.5}>
            <Iconify icon="carbon:events" width={24} />

            <Stack spacing={0.5}>
              <Typography variant="caption">Total Guests</Typography>
              <Typography variant="body" color="text.primary">
                {guestsToBooked.adults > 0 ? `${guestsToBooked.adults} Adults` : ''}
                {guestsToBooked.children > 0 ? `, ${guestsToBooked.children} Kids` : ''}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          color="inherit"
          loading={isSubmitting}
        >
          Proceed to Pay
        </LoadingButton>
      </Stack>
    </Card>
  );
}

TravelCheckOutSummary.propTypes = {
  isSubmitting: PropTypes.bool,

  dates: PropTypes.instanceOf(Date),
  guestsToBooked: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
  }),
  propertyToView: PropTypes.object,
};
