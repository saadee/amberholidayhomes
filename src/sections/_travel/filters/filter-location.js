import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { propertylocationsAreas } from 'src/_mock';

// ----------------------------------------------------------------------

export default function FilterLocation() {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      popupIcon={null}
      options={propertylocationsAreas}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Where we go?"
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={24} icon="carbon:location" sx={{ color: 'text.disabled', mr: 1 }} />
            </InputAdornment>
          }
          sx={{ height: 44, typography: 'subtitle1', color: 'white' }}
        />
      )}
      renderOption={(props, option) => {
        if (!option) {
          return null;
        }

        return (
          <li {...props} key={option}>
            <Iconify key={option} icon="carbon:location" width={28} sx={{ mr: 1 }} />
            {option}
          </li>
        );
      }}
    />
  );
}
