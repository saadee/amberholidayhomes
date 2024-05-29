import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import TestimonialItem from './travel-testimonial-item';

// ----------------------------------------------------------------------

const testimonials = [
  {
    name: 'Faisal Khan',
    comments:
      'Fantastic rental experience! Modern apartment, convenient location, and excellent landlord.Highly satisfied!',
    title: 'Resident',
    ratingNumber: 5,
  },
  {
    name: 'Muhammad Ali',
    comments:
      'Highly recommend this property! Peaceful neighborhood, updated appliances, and attentive property management.',
    title: 'Renter',
    ratingNumber: 5,
  },
  {
    name: 'Aisha Ahmed',
    comments:
      'Excellent rental choice! Convenient amenities, well-designed apartment, and professional landlord. Very happy with my decision!',
    title: 'Tenant',
    ratingNumber: 5,
  },
  {
    name: 'Yusuf Abbas',
    comments:
      'Great rental property! Spacious and well-maintained with a responsive property management team. Highly recommended!',
    title: 'Leasee',
    ratingNumber: 5,
  },
];
export default function TravelTestimonial() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    dots: !mdUp,
    slidesToShow: 3,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
    responsive: [
      {
        // Down md
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2, slidesToScroll: 3 },
      },
      {
        // Down sm
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  });

  return (
    <Container
      sx={{
        // pt: 8,
        py: { xs: 8, md: 20 },
      }}
    >
      <Stack alignItems="center" sx={{ mb: 8 }}>
        <Typography variant="h3" color="secondary">
          Testimonials
        </Typography>
        <Typography variant="h2" sx={{ textAlign: { xs: 'center', md: 'unset' }, flexGrow: 1 }}>
          What Our Customer Say About Us
        </Typography>
      </Stack>

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1.5 }}>
            <TestimonialItem testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>
      <Box sx={{ my: 2, textAlign: 'center' }}>
        {mdUp && (
          <CarouselArrows
            spacing={2}
            justifyContent="center"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          />
        )}
      </Box>
    </Container>
  );
}

TravelTestimonial.propTypes = {};
