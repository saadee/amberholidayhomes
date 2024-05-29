import PropTypes from 'prop-types';

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import InputBase from '@mui/material/InputBase';
// import InputAdornment from '@mui/material/InputAdornment';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterTime({ departureDay, onChangeDepartureDay, ...other }) {
  return (
    <DateRangePicker
      format="dd/MM/yyyy"
      label="Check In & Check Out"
      slots={{ field: SingleInputDateRangeField }}
      value={departureDay}
      onChange={onChangeDepartureDay}
      disablePast
      // onBlur={onBlur}
      {...other}
    />
  );
}

FilterTime.propTypes = {
  sx: PropTypes.object,
  onChangeDepartureDay: PropTypes.func,
  departureDay: PropTypes.instanceOf(Date),
};
