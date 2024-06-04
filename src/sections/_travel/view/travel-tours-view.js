import { useEffect } from 'react';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { usePropertyContext } from 'src/context/PropertyContext';

import TravelNewsletter from '../travel-newsletter';
import TravelTourList from '../list/travel-tour-list';
import TravelListingFilters from '../filters/travel-listing-filters';

// ----------------------------------------------------------------------

export default function TravelToursView() {
  const { isListingLoading, filterProperties } = usePropertyContext();

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      isListingLoading.onFalse();
    };
    fakeLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <TravelListingFilters
          sx={{
            mt: 5,
            mb: { xs: 5, md: 5 },
            position: 'sticky',
            top: 70,
            zIndex: 9,
          }}
        />
        <Typography variant="h5" align="right" mb={2}>
          Available Listings ({filterProperties?.length})
        </Typography>
        <TravelTourList loading={isListingLoading.value} />
      </Container>

      <TravelNewsletter />
    </>
  );
}
