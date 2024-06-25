
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TravelCheckOutShippingForm() {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>
          Contact Information
        </Typography>

        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email" />
          </Stack>
          <RHFTextField name="phoneNumber" label="Phone Number" />
        </Stack>
      </div>
    </Stack>
  );
}

TravelCheckOutShippingForm.propTypes = {};
