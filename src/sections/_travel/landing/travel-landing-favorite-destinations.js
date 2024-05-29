import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

import oneBr from '../../../assets/propertyType/1br.jpg';
import TwoBr from '../../../assets/propertyType/2br.jpeg';
import ThreeBr from '../../../assets/propertyType/3br.jpg';
import Villa from '../../../assets/propertyType/villa.jpg';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const PropertyTypes = [
  {
    title: '1 BR Apartment',
    image: oneBr,
  },
  {
    title: '2 BR Apartment',
    image: TwoBr,
  },
  {
    title: '3 BR Apartment',
    image: ThreeBr,
  },
  {
    title: 'Villa',
    image: Villa,
  },
];
export default function TravelLandingFavoriteDestinations({ tours }) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      
      <Grid
        container
        rowSpacing={{ xs: 8, md: 0 }}
        columnSpacing={{ xs: 0, md: 3 }}
        alignItems={{ md: 'center' }}
        justifyContent={{ md: 'space-between' }}
      >
        <Grid xs={12} md={3}>
          <Typography variant="h3" color="secondary">
            Choose Your
          </Typography>

          <Typography variant="h2" sx={{ my: 1 }}>
            Residential Properties in Dubai
          </Typography>
        </Grid>

        <Grid container xs={12} md={7} spacing={{ xs: 4, md: 3 }}>
          {PropertyTypes.map((tour, index) => (
            <Grid
              key={index}
              xs={12}
              sm={6}
              sx={{
                ...(index === 1 && {
                  display: { md: 'inline-flex' },
                  alignItems: { md: 'flex-end' },
                }),
              }}
            >
              <DestinationItem tour={tour} order={index % 3} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

TravelLandingFavoriteDestinations.propTypes = {
  tours: PropTypes.array,
};

// ----------------------------------------------------------------------

function DestinationItem({ tour, order }) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const { title,image } = tour;

  return (
    <Box
      sx={{
        width: 1,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        alt={title}
        src={image}
        ratio={(!mdUp && '1/1') || (order && '3/4') || '4/6'}
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.white, 0)} 0%, ${
          theme.palette.common.black
        } 100%)`}
      />

      <Stack
        spacing={1}
        sx={{
          p: 3,
          left: 0,
          bottom: 0,
          zIndex: 9,
          color: 'common.white',
          position: 'absolute',
        }}
      >
        <Typography variant="h3" line={1}>
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}

DestinationItem.propTypes = {
  order: PropTypes.number,
  tour: PropTypes.shape({
    continent: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};
