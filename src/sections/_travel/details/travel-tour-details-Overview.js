import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function TravelTourDetailsOverview({ propertyToView }) {
  const { area, minNights, propertySize, bath, beds, rooms, guests, time } = propertyToView;

  const { checkInHour, checkOutHour } = time;

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">Property Overview</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          <OverviewItem icon="carbon:area" label="Property Size" text={`${propertySize} sq.ft`} />
          <OverviewItem icon="bi:people" label="Guest Capacity" text={guests} />
          <OverviewItem icon="solar:bath-linear" label="Bath" text={bath} />
          <OverviewItem icon="ic:outline-bed" label="Rooms" text={rooms} />
          <OverviewItem icon="ic:outline-bed" label="Beds" text={beds?.length} />
          <OverviewItem icon="carbon:location" label="Location" text={area} />
          <OverviewItem icon="ion:cloudy-night-outline" label="Min Nights" text={minNights} />
        </Box>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h5">Check In Details</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {checkInHour && (
            <OverviewItem
              icon="carbon:time"
              label="Check In"
              text={fDateTime(checkInHour.toDate(), 'p')}
            />
          )}
          {checkInHour && (
            <OverviewItem
              icon="carbon:time"
              label="Check Out"
              text={fDateTime(checkOutHour.toDate(), 'p')}
            />
          )}
          <OverviewItem
            label="Late Check-in"
            text="Please note that our standard check-in time is 3:00 pm and check-out time is 12:00 pm. Early check-ins and late check-outs are subject to availability and additional charges may apply!"
          />
          <OverviewItem label="Cancellation" text="Non-Refundable" />
        </Box>
      </Stack>
    </Stack>
  );
}

TravelTourDetailsOverview.propTypes = {
  propertyToView: PropTypes.object,
};

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};

// ----------------------------------------------------------------------

function HighlightItem({ label, text }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 2,
            borderRadius: 1,
            bgcolor: 'currentColor',
            mr: 1.5,
          }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}

HighlightItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};
