import { useParams } from 'react-router';
import { useEffect, useCallback } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';

import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _tours } from 'src/_mock';
import { DB } from 'src/context/AuthContext';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import { usePropertyContext } from 'src/context/PropertyContext';

import TravelNewsletter from '../travel-newsletter';
// import TravelTourListSimilar from '../list/travel-tour-list-similar';
import TravelTourDetailsHeader from '../details/travel-tour-details-header';
import TravelTourDetailsGallery from '../details/travel-tour-details-gallery';
import TravelTourDetailsSummary from '../details/travel-tour-details-summary';
import TravelTourDetailsReserveForm from '../details/travel-tour-details-reserve-form';

// ----------------------------------------------------------------------

const _mockTour = _tours[0];

export default function TravelTourView() {
  const loading = useBoolean(true);
  const { id } = useParams();

  const { propertyToView, setPropertyToView } = usePropertyContext();

  const getPropertyDetailsById = useCallback(
    async (propertyId) => {
      loading.onTrue();
      // Reference to the 'property' collection
      const propertyCollection = collection(DB, 'property');

      // Reference to the specific document by ID
      const propertyDocRef = doc(propertyCollection, propertyId);

      try {
        const documentSnapshot = await getDoc(propertyDocRef);

        if (documentSnapshot.exists()) {
          const propertyData = { id: documentSnapshot.id, ...documentSnapshot.data() };
          console.log('Property data:', propertyData);
          setPropertyToView(propertyData);
          // You can set your state or do further processing with the data here
        } else {
          console.log('Document not found');
          // Handle the case where the document with the provided ID doesn't exist
        }
        loading.onFalse();
      } catch (error) {
        loading.onFalse();

        console.error('Error getting document: ', error);
        // Handle errors appropriately
      }
    },
    [loading, setPropertyToView]
  );

  useEffect(() => {
    if (!propertyToView?.id) {
      getPropertyDetailsById(id);
    }
  }, [getPropertyDetailsById, id, propertyToView?.id]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <TravelTourDetailsHeader tour={propertyToView} />
        <TravelTourDetailsGallery images={propertyToView?.images} />

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <TravelTourDetailsReserveForm tour={_mockTour} />
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

            <TravelTourDetailsSummary tour={_mockTour} />

            {/* <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
                Share:
              </Typography>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {_socials.map((social) => (
                  <Button
                    key={social.value}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={social.icon} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: social.color,
                      borderColor: social.color,
                      '&:hover': {
                        borderColor: social.color,
                        bgcolor: alpha(social.color, 0.08),
                      },
                    }}
                  >
                    {social.label}
                  </Button>
                ))}
              </Stack>
            </Stack> */}
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 10 }} />

      {/* <ReviewTravel /> */}

      {/* <TravelTourListSimilar tours={_tours.slice(-4)} /> */}

      <TravelNewsletter />
    </>
  );
}
