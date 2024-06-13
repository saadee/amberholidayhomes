import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
import FormProvider from 'src/components/hook-form';
import { usePropertyContext } from 'src/context/PropertyContext';

import TravelCheckOutSummary from '../checkout/travel-check-out-summary';
import TravelCheckOutPaymentForm from '../checkout/travel-check-out-payment-form';
import TravelCheckOutShippingForm from '../checkout/travel-check-out-shipping-form';

// ----------------------------------------------------------------------

export default function TravelCheckoutView() {
  // const router = useRouter();
  const { setFilters, filters, propertyToView } = usePropertyContext();
  const { dates, guests } = filters;

  const TravelCheckoutSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    paymentMethods: {
      methods: 'paypal',
      card: {
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        ccv: '',
      },
    },
  };

  const methods = useForm({
    resolver: yupResolver(TravelCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // router.push(paths.orderCompleted);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleIncrementGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setFilters({
          ...filters,
          guests: { ...filters.guests, children: filters.guests.children + 1 },
        });
      } else {
        setFilters({
          ...filters,
          guests: { ...filters.guests, adults: filters.guests.adults + 1 },
        });
      }
    },
    [filters, setFilters]
  );

  const handleDecreaseGuests = useCallback(
    (guest) => {
      if (guest === 'children') {
        setFilters({
          ...filters,
          guests: { ...filters.guests, children: filters.guests.children - 1 },
        });
      } else {
        setFilters({
          ...filters,
          guests: { ...filters.guests, adults: filters.guests.adults - 1 },
        });
      }
    },
    [filters, setFilters]
  );

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
      <Typography variant="h2" sx={{ mb: 5 }}>
        Confirm and Pay
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              <StepLabel title="Shipping Information" step="1" />

              <TravelCheckOutShippingForm
              />

              <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

              <StepLabel title="Payment Methods" step="2" />

              <TravelCheckOutPaymentForm />
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <TravelCheckOutSummary
              propertyToView={propertyToView}
              guestsToBooked={guests}
              dates={dates}
              isSubmitting={isSubmitting}
              onDecreaseGuests={handleDecreaseGuests}
              onIncrementGuests={handleIncrementGuests}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h5' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
