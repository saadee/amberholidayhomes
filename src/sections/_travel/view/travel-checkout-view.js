// import { paths } from 'src/routes/paths';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { useRouter } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import {
  getNightsFromDates,
  getTourismDirhamFee,
  createReservationAmounts,
} from 'src/utils/common';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { usePropertyContext } from 'src/context/PropertyContext';
import FormProvider from 'src/components/hook-form';
import { RESERVATION_STATUS_OPTIONS } from 'src/_mock';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { DB } from 'src/context/AuthContext';
import TravelCheckOutSummary from '../checkout/travel-check-out-summary';

import TravelCheckOutPaymentForm from '../checkout/travel-check-out-payment-form';
import TravelCheckOutShippingForm from '../checkout/travel-check-out-shipping-form';

// ----------------------------------------------------------------------

export default function TravelCheckoutView() {
  const router = useRouter();
  // const params = useParams();
  const searchParams = useSearchParams();

  const { setFilters, filters, propertyToView } = usePropertyContext();
  const { dates, guests } = filters;

  const { images, title, rentPerNight, propertyType, securityDeposit } = propertyToView;

  const checkInDate = fDate(dates ? dates[0] : new Date());
  const checkOutDate = fDate(dates ? dates[1] : new Date());

  const nights = getNightsFromDates(dates);
  const totalRentalAmount = nights * rentPerNight;

  const TDF = propertyType ? getTourismDirhamFee(propertyType, nights) : 0;

  const vat5Per = totalRentalAmount * 0.05;

  const totalAmountToSend = (totalRentalAmount + vat5Per + TDF) * 100;

  console.log('totalAmountToSend', totalAmountToSend);

  const TravelCheckoutSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(TravelCheckoutSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!propertyToView) router.push('/');
  }, [propertyToView, router]);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createReservation = async (data) => {
    try {
      // const { property, dates, services, ownerStay, ...rest } = data;

      const checkIn = new Date(dates[0]).setHours(15, 0, 0, 0); // 3pm Noon
      const checkOut = new Date(dates[1]).setHours(12, 0, 0, 0); // 12pm Noon

      const createdAt = serverTimestamp();
      // const deletionTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

      // const modifiedServices = ownerStay ? [] : services?.map((e) => ({ ...e, addedAt: Timestamp.now() }));

      const dataToSend = {
        ...data,
        dates,
        checkIn, // 3pm Noon
        checkOut,
        createdAt,
        status: RESERVATION_STATUS_OPTIONS[0]?.value, // by default it should be confirmed
        propertyId: propertyToView?.id,
        propertyOwnerId: propertyToView?.propertyOwner,
        services: [],
        ownerStay: false,
        guests,
        rentalAmount: totalRentalAmount,
        fromGuestSite: true,
        ...createReservationAmounts(totalRentalAmount, propertyToView, dates),
      };

      console.log('data', dataToSend);

      const resRef = await addDoc(collection(DB, 'reservations'), dataToSend);

      return resRef.id;
    } catch (error) {
      return console.log('error creating reservation', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const resId = await createReservation(data);

      const { totalAmount, vat, tourismDirhamFee, securityAmount } = createReservationAmounts(
        totalRentalAmount,
        propertyToView,
        dates
      );

      const res = await axios.post(
        'http://localhost:8000/api/pay',
        // const res = await axios.post(
        //   'https://holidayhomes-stripe-node.vercel.app/api/pay',

        JSON.stringify({
          ...data,
          domain: window.location.origin,
          imageUrl: images[0],
          propertyName: title,
          totalRentalAmount,
          totalAmount,
          vat,
          tourismDirhamFee,
          securityAmount,
          reservationId: resId,
          metaData: {
            reservationId: resId,
          },
          description: `
          Your booking for
            ${guests.adults > 0 ? `${guests.adults} Adults` : ''}
            ${guests.children > 0 ? `, ${guests.children} Kids` : ''}
          } from  ${checkInDate} - ${checkOutDate}
          `,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('res', res.data);
      const { url } = res.data;

      window.location.replace(url);
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
              <TravelCheckOutShippingForm />

              <Divider sx={{ my: 5, borderStyle: 'dashed' }} />
              <Stack spacing={2}>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Rent</Typography>
                  <Typography variant="body2">{fCurrency(totalRentalAmount)}</Typography>
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Security Desposit</Typography>
                  <Typography variant="body2">{fCurrency(securityDeposit)}</Typography>
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Toursim Fee</Typography>
                  <Typography variant="body2">{fCurrency(TDF)}</Typography>
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Vat (5%)</Typography>
                  <Typography variant="body2">{fCurrency(vat5Per)}</Typography>
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5">
                    {fCurrency(totalRentalAmount + vat5Per + TDF + securityDeposit)}
                  </Typography>
                </Stack>
              </Stack>

              {/* <StepLabel title="Payment Methods" step="2" /> */}

              {/* <TravelCheckOutPaymentForm /> */}
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
