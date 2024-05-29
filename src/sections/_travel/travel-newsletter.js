import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';
import { DB } from 'src/context/AuthContext';
import { useBoolean } from 'src/hooks/use-boolean';
import { RHFTextField } from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import FormProvider from 'src/components/hook-form/form-provider';

// ----------------------------------------------------------------------

export default function TravelNewsletter() {
  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const isSubmitting = useBoolean();
  const isSubmitted = useBoolean();

  const NewsLetterScheme = Yup.object().shape({
    // property Info
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string(),
  });

  const defaultValues = { name: '', email: '', phoneNumber: '' };

  const methods = useForm({
    resolver: yupResolver(NewsLetterScheme),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      isSubmitting.onToggle();
      console.log(formData);
      await addDoc(collection(DB, 'newsletter'), formData);
      reset();
      isSubmitted.onTrue();
      setTimeout(() => {
        isSubmitted.onFalse();
      }, 3000);
      isSubmitting.onToggle();
    } catch (error) {
      console.error('error in submit form', error);
    }
  });

  return (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.grey[900], 0.88)}`,
          endColor: `${alpha(theme.palette.grey[900], 0.88)}`,
          imgUrl: '/assets/images/travel/travel_newsletter.jpg',
          ...(upMd && {
            direction: 'to right',
            startColor: `${alpha(theme.palette.grey[900], 0)} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 1)} 50%`,
            imgUrl: '/assets/images/travel/travel-newsletter1.jpg',
          }),
        }),
        py: 10,
        backgroundSize: 'cover, auto 100%',
        backgroundPosition: { xs: 'center', md: 'center, left' },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isSubmitted.value}
        autoHideDuration={3000}
        message="Successfully Subscribed"
        action
      />
      <Container>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid xs={12} md={5}>
            <Stack
              spacing={3}
              sx={{
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h3">Sign Up for Our Newsletter & Get Special Offers</Typography>
              <Typography>Sign up now and get the best deals straight in your inbox!</Typography>

              <FormProvider methods={methods} onSubmit={onSubmit}>
                <RHFTextField
                  name="name"
                  fullWidth
                  hiddenLabel
                  placeholder=" Name"
                  sx={{ mb: 2, color: 'yellow' }}
                />
                <RHFTextField
                  name="email"
                  fullWidth
                  hiddenLabel
                  placeholder=" Email"
                  sx={{ mb: 2, color: 'yellow' }}
                />
                <RHFTextField
                  name="phoneNumber"
                  fullWidth
                  hiddenLabel
                  placeholder=" Phone Number (optional)"
                  sx={{ mb: 2, color: 'yellow' }}
                />
                <LoadingButton
                  loading={isSubmitting.value}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Subscribe
                </LoadingButton>
              </FormProvider>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
