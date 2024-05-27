import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import TestimonialItem from './travel-testimonial-item';

// ----------------------------------------------------------------------

export default function EcommerceTestimonial({ testimonials }) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    dots: !mdUp,
    slidesToShow: 4,
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
        <Typography variant="h3" color="primary">
          Testimonials
        </Typography>
        <Typography variant="h2" sx={{ textAlign: { xs: 'center', md: 'unset' }, flexGrow: 1 }}>
          What Our Customer Say About Us
        </Typography>

        {mdUp && (
          <CarouselArrows
            spacing={2}
            justifyContent="center"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          />
        )}
      </Stack>

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1.5 }}>
            <TestimonialItem testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}

EcommerceTestimonial.propTypes = {
  testimonials: PropTypes.array,
};
