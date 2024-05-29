import { InputAdornment } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterRoom() {
  return (
    <Autocomplete
      sx={{ width: 0.7 }}
      popupIcon={null}
      options={[...Array(10)].map((option, i) => i)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Rooms"
          sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={24} icon="material-symbols:bed" sx={{ color: 'text.disabled', mr: 1 }} />
            </InputAdornment>
          }
        />
      )}
    />
  );
}
