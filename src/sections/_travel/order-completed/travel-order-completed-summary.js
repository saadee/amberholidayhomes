import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function TravelOrderCompletedSummary({ reservation }) {
  const { checkIn, checkOut, guests, rentalAmount, totalAmount, tourismDirhamFee, vat, id } =
    reservation;
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h5">Booking Details</Typography>

      <LineItem icon="carbon:calendar" label="Check-In" value={fDate(checkIn)} />
      <LineItem icon="carbon:calendar" label="Check-Out" value={fDate(checkOut)} />

      <LineItem
        icon="carbon:events"
        label="Guests"
        value={`${guests.adults} Adults, ${guests?.children} Kids`}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItem icon="carbon:cube" label="Booking code" value={id} />

      {/* <LineItem icon="carbon:calendar" label="Booking day" value={fDate(new Date())} /> */}
      <Divider sx={{ borderStyle: 'dashed' }} />
      <LineItem icon="grommet-icons:money" label="Rent" value={fCurrency(rentalAmount)} />
      <LineItem
        icon="mdi:hand-coin-outline"
        label="Toursim Fee"
        value={fCurrency(tourismDirhamFee)}
      />
      <LineItem icon="tabler:tax" label="VAT" value={fCurrency(vat)} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <LineItem icon="carbon:receipt" label="Total" value={fCurrency(totalAmount)} />
      {/* <LineItem icon="carbon:receipt" label="Total" value={fCurrency(1112)} /> */}
      {/* <LineItem icon="carbon:receipt" label="Total" value={fCurrency(1112)} /> */}

      {/* <LineItem icon="carbon:purchase" label="Payment method" value="Paypal" /> */}
    </Stack>
  );
}

TravelOrderCompletedSummary.propTypes = {
  reservation: PropTypes.object,
};
// ----------------------------------------------------------------------

function LineItem({ icon, label, value }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ typography: 'body2', color: 'text.secondary' }}
    >
      <Iconify icon={icon} width={24} sx={{ mr: 1 }} /> {label}
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.primary', flexGrow: 1, textAlign: 'right' }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

LineItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  value: PropTypes.string,
};
