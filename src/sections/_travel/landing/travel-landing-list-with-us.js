import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function TravelLandingListWithUs({ tours }) {

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 15 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          my: { xs: 8, md: 10 },
          textAlign: 'center',
        }}
      >
        <Box mb={3} sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="h3" color="primary" align="center">
            List With Us
          </Typography>
          <Typography variant="h2" align="center">
            Property Owners - List Your Vacation Home
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          my:10,
          gap: 2,
          display: 'grid',
          // alignItems: 'center',
          justifyContent: 'center',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        <Box >
          <Stack spacing={3}>
            <Iconify icon="fa:repeat" width={40} sx={{ m: 'auto' }} />
            <Typography variant="h3" align="center">
              High Occupancy
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{lineHeight:2}}>
              Maximize your property&apos;s potential with our expertise in achieving consistently
              high occupancy rates for your vacation home.
            </Typography>
          </Stack>
        </Box>
        <Box >
          <Stack spacing={3}>
            <Iconify icon="streamline:graph-bar-increase-solid" width={40} sx={{ m: 'auto' }} />
            <Typography variant="h3" align="center" sx={{lineHeight:1.2}}>
              Personalized Guest Experience
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{lineHeight:2}}>
              Elevate guest satisfaction with our dedicated approach, ensuring each guest enjoys a
              personalized and memorable stay tailored to their preferences
            </Typography>
          </Stack>
        </Box>
        <Box >
          <Stack spacing={3}>
            <Iconify icon="dashicons:money-alt" width={50} sx={{ m: 'auto' }} />
            <Typography variant="h3" align="center">
              Full Transparency
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{lineHeight:2}}>
              With our state of the art owners portal experience peace of mind with our commitment
              to full transparency, providing clear and comprehensive information about bookings,
              our services, fees, and property management processes.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

TravelLandingListWithUs.propTypes = {
  tours: PropTypes.array,
};

// ----------------------------------------------------------------------

function TourItem({ tour }) {
  const { coverUrl, location } = tour;

  return (
    <Link component={RouterLink} href={paths.travel.tour} color="inherit" underline="none">
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          cursor: 'pointer',
          bgcolor: 'background.default',
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z24,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2.5}>
          <Avatar src={coverUrl} sx={{ width: 64, height: 64 }} />

          <Stack spacing={0.5}>
            <TextMaxLine variant="h6" line={1}>
              {location}
            </TextMaxLine>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              196 Place
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Link>
  );
}

TourItem.propTypes = {
  tour: PropTypes.shape({
    coverUrl: PropTypes.string,
    location: PropTypes.string,
  }),
};
