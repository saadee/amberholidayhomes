import { InputAdornment } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterGuest(props) {
  return (
    <Autocomplete
      {...props}
      sx={{ width: 0.7 }}
      popupIcon={null}
      options={[...Array(30)].map((option, i) => i + 1)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Guests"
          sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={24} icon="carbon:events" sx={{ color: 'text.disabled', mr: 1 }} />
            </InputAdornment>
          }
        />
      )}
    />
  );
}
