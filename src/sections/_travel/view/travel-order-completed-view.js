import { useCallback, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, useSearchParams } from 'react-router-dom';

import { RESERVATION_STATUS_OPTIONS, _tours } from 'src/_mock';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

import { usePropertyContext } from 'src/context/PropertyContext';
import { useRouter } from 'src/routes/hooks';
import { DB } from 'src/context/AuthContext';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import TravelOrderCompletedInfo from '../order-completed/travel-order-completed-info';
import TravelOrderCompletedSummary from '../order-completed/travel-order-completed-summary';

// ----------------------------------------------------------------------

const _mockTour = _tours[1];

export default function TravelOrderCompletedView() {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  const [reservationToView, setReservationToView] = useState({});

  const { properties } = usePropertyContext();

  console.log('search', window.location.search);

  const getAndMarkReservationAsPaid = useCallback(
    async (reservationId) => {
      // Reference to the 'reservations' collection
      const reservationCollection = collection(DB, 'reservations');

      // Reference to the specific document by ID
      const reservationDocRef = doc(reservationCollection, reservationId);

      try {
        const documentSnapshot = await getDoc(reservationDocRef);

        if (documentSnapshot.exists()) {
          const reservationData = { id: documentSnapshot.id, ...documentSnapshot.data() };
          setReservationToView(reservationData);
          // Update the reservation document to set 'isPaid' to true
          await updateDoc(reservationDocRef, {
            isPaid: true,
            status: RESERVATION_STATUS_OPTIONS[1]?.value,
          });
          console.log('Reservation marked as paid');
        } else {
          console.log('Reservation document not found');
          // Handle the case where the document with the provided ID doesn't exist
        }
      } catch (error) {
        console.error('Error getting or updating reservation document: ', error);
        // Handle errors appropriately
      }
    },
    [setReservationToView]
  );

  useEffect(() => {
    (async () => {
      if (window.location.search !== '') {
        console.log('ID Available');
        await getAndMarkReservationAsPaid(window.location.search.replace('?', ''));
      } else router.push('/listing');
    })();
  }, [getAndMarkReservationAsPaid, router]);

  console.log('reservationToView', reservationToView);

  const property = properties?.find((e) => e.id === reservationToView?.propertyId);
  console.log('property', property);

  return (
    reservationToView?.id && (
      <Container
        sx={{
          pt: 5,
          pb: { xs: 8, md: 15 },
          gap: 10,
          display: 'grid',
          alignItems: 'flex-start',
          gridTemplateColumns: { md: 'repeat(2, 1fr)' },
        }}
      >
        {mdUp && property?.id && (
          <Image alt="cover" src={property?.images[0]} ratio="3/4" sx={{ borderRadius: 2 }} />
        )}

        <Stack spacing={5}>
          <Typography variant="h2">Completed 🎉</Typography>

          {property && <TravelOrderCompletedInfo tour={property} />}

          <TravelOrderCompletedSummary reservation={reservationToView} />

          <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
            <Button
              component={RouterLink}
              href="/"
              variant="outlined"
              size="large"
              color="inherit"
              startIcon={<Iconify icon="carbon:chevron-left" />}
            >
              Back Home
            </Button>

            <Button
              variant="contained"
              size="large"
              color="inherit"
              startIcon={<Iconify icon="carbon:package" />}
            >
              Download Invoice
            </Button>
          </Stack>
        </Stack>
      </Container>
    )
  );
}
