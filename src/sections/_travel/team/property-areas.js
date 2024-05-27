import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import DubaiCreek from '../../../assets/properties/dubai-creek.jpg';
import DubaiHills from '../../../assets/properties/dubai-hills.jpg';
import Downtown from '../../../assets/properties/dubai-downtown.jpg';
import ArabianRanches from '../../../assets/properties/arabian-ranches.jpg';
import EmaatBeachFront from '../../../assets/properties/emaar-beach-front.jpeg';
import JumaeirahBeach from '../../../assets/properties/jumerirah-beach-residence.jpg';

import PropertyAreaItem from './property-area-item';

// ----------------------------------------------------------------------

const PropertyAreasList = [
  {
    image: JumaeirahBeach,
    title: 'Jumeirah Beach Residence',
    description:
      'Consisting of 36 residential towers, JBR is one of the major tourist destinations across Dubai with its beach, retail activity, residence apartments for rent',
  },
  {
    image: ArabianRanches,
    title: 'Arabian Ranches',
    description:
      'Al Reem is a theme villa community development with three themed and gated communities in Arabian Ranches. One of them is the Al Reem .',
  },
  {
    image: DubaiHills,
    title: 'Dubai Hills',
    description:
      'Consisting of 36 residential towers, JBR is one of the major tourist destinations across Dubai with its beach, retail activity, residence apartments for rent',
  },
  {
    image: DubaiCreek,
    title: 'Dubai Creek',
    description:
      'Consisting of 36 residential towers, JBR is one of the major tourist destinations across Dubai with its beach, retail activity, residence apartments for rent',
  },
  {
    image: EmaatBeachFront,
    title: 'Emaar Beach Front',
    description:
      'Consisting of 36 residential towers, JBR is one of the major tourist destinations across Dubai with its beach, retail activity, residence apartments for rent',
  },
  {
    image: Downtown,
    title: 'Downtown Dubai',
    description:
      'Consisting of 36 residential towers, JBR is one of the major tourist destinations across Dubai with its beach, retail activity, residence apartments for rent',
  },
];

export default function PropertyAreas({ members }) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 780,
          textAlign: 'center',
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h3" color="primary">
          Discover Best
        </Typography>
        <Typography variant="h3">
          Browse top demanded locations for Dubai short term rental furnished. apartments and villas
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Explore sought-after destinations for short-term furnished rentals in Dubai&lsquo;s prime
          apartments and villas.
        </Typography>
      </Stack>

      <Box
        sx={{
          columnGap: 3,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {PropertyAreasList.map((property, i) => (
          <PropertyAreaItem key={i} property={property} />
        ))}
      </Box>
    </Container>
  );
}

PropertyAreas.propTypes = {
  members: PropTypes.array,
};
