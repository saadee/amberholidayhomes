import { InputAdornment } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterBath() {
  return (
    <Autocomplete
      sx={{ width: 0.7 }}
      popupIcon={null}
      options={[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map((option) => option)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Bath"
          sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={24} icon="solar:bath-bold" sx={{ color: 'text.disabled', mr: 1 }} />
            </InputAdornment>
          }
        />
      )}

    />
  );
}
