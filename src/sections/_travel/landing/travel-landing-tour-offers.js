
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { usePropertyContext } from 'src/context/PropertyContext';

import TravelTourItem from '../list/travel-tour-item';

// ----------------------------------------------------------------------

export default function TravelLandingTourOffers() {
  const { properties,  } = usePropertyContext();

  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" color="secondary">
          Special Offers
        </Typography>

        <Typography variant="h2">Our Best Packages For You</Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          my: { xs: 8, md: 10 },
          gap: { xs: 4, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {properties
          ?.filter((e) => e?.discountRatio > 0)
          .map((property) => (
            <TravelTourItem key={property.id} property={property} />
          ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={paths.listings}
          size="large"
          variant="outlined"
          color="inherit"
        >
          View All Listings
        </Button>
      </Box>
    </Container>
  );
}

TravelLandingTourOffers.propTypes = {

};
