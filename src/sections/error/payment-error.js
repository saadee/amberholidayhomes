import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { RouterLink } from 'src/routes/components';
import { varBounce, MotionContainer } from 'src/components/animate';
import { Box } from '@mui/material';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { DB } from 'src/context/AuthContext';
import { useCallback, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function PaymentError() {
  const deleteReservationDoc = useCallback(async (reservationId) => {
    // Reference to the 'reservations' collection
    const reservationCollection = collection(DB, 'reservations');

    // Reference to the specific document by ID
    const reservationDocRef = doc(reservationCollection, reservationId);

    try {
      await deleteDoc(reservationDocRef);
    } catch (error) {
      console.error('Error getting or updating reservation document: ', error);
      // Handle errors appropriately
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (window.location.search !== '') {
        console.log('ID Available');
        await deleteReservationDoc(window.location.search.replace('?', ''));
      }
    })();
  }, [deleteReservationDoc]);

  return (
    <Box sx={{ py: 10, textAlign: 'center' }}>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            An Unexpected Error occured!!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error during your payment, please try again
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            alt="500"
            src="/assets/illustrations/illustration_500.svg"
            sx={{
              mx: 'auto',
              maxWidth: 320,
              my: { xs: 5, sm: 8 },
            }}
          />
        </m.div>

        <Button
          component={RouterLink}
          href="/listing"
          size="large"
          color="inherit"
          variant="contained"
        >
          Go to All Listing
        </Button>
      </MotionContainer>
    </Box>
  );
}
