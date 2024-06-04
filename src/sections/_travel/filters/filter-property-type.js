import { InputAdornment } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';

import { _propertyType } from 'src/_mock';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterPropertyType(props) {
  return (
    <Autocomplete
      {...props}
      sx={{ width: 0.8 }}
      popupIcon={null}
      options={_propertyType}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Property Type"
          sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                width={24}
                icon="material-symbols:house"
                sx={{ color: 'text.disabled', mr: 1 }}
              />
            </InputAdornment>
          }
        />
      )}
    />
  );
}
