import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CountUp from 'src/components/count-up';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    total: 50,
    description: 'Managed Properties',
    icon: '/assets/icons/travel/ic_travel_tickets.svg',
    subText: '+',
  },
  {
    total: 100,
    description: 'AED Worth Portfolio',
    icon: '/assets/icons/travel/ic_travel_site_visitors.svg',
    subText: 'M',
  },
  {
    total: 20,
    description: 'Staff Members',
    icon: '/assets/icons/travel/ic_travel_tickets.svg',
    subText: '+',
  },
  {
    total: 3000,
    description: 'Accommodated Guests',
    icon: '/assets/icons/travel/ic_travel_verified_hotels.svg',
    subText: '+',
  },
  {
    total: 10000,
    description: 'Booked Nights',
    icon: '/assets/icons/travel/ic_travel_booking.svg',
    subText: '+',
  },
  {
    total: 120,
    description: 'Nationalities',
    icon: '/assets/icons/travel/ic_travel_tickets.svg',
  },
];

// ----------------------------------------------------------------------

export default function TravelLandingSummary() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h1" mb={2}>
        Who We Are & What We Do?
      </Typography>
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 580,
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography sx={{ color: 'text.secondary' }}>
          Amber Holiday Homes is a premier vacation rental company in Dubai, redefining the concept
          of luxury getaways. With an unwavering focus on impeccable service and exceptional
          accommodations, we offer a handpicked selection of villas and apartments that embody
          sophistication and comfort.
        </Typography>
        <Button variant="contained" sx={{ width: 'fit-content', m: 'auto' }}>
          Learn More
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 8, md: 6 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(6, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.description} spacing={1}>
            {/* <Image
              alt={value.icon}
              src={value.icon}
              sx={{ mb: 3, width: 80, height: 80, mx: 'auto' }}
            /> */}

            <Typography variant="h3">
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue) => fShortenNumber(newValue)}
              />
              {value.subText}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
