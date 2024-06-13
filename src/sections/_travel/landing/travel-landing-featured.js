import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { bgBlur, bgGradient } from 'src/theme/css';
import { fCurrency } from 'src/utils/format-number';
import TextMaxLine from 'src/components/text-max-line';
import { useResponsive } from 'src/hooks/use-responsive';
import { usePropertyContext } from 'src/context/PropertyContext';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function TravelLandingFeatured() {
  const { properties } = usePropertyContext();

  const mdUp = useResponsive('up', 'md');

  const carouselLarge = useCarousel({
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 64,
        position: 'absolute',
        display: { md: 'none' },
      },
    }),
  });

  const carouselThumb = useCarousel({
    vertical: true,
    slidesToShow: 4,
    centerMode: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    verticalSwiping: true,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  return (
    <Box sx={{ minHeight: { md: '100vh' }, position: 'relative' }}>
      {!!properties.length && (
        <Carousel
          {...carouselLarge.carouselSettings}
          asNavFor={carouselThumb.nav}
          ref={carouselLarge.carouselRef}
        >
          {properties?.map((tour, index) => (
            <CarouselItem key={index} tour={tour} />
          ))}
        </Carousel>
      )}

      {mdUp && (
        <Stack
          spacing={2}
          justifyContent="center"
          sx={{
            top: 0,
            height: 1,
            maxWidth: 220,
            position: 'absolute',
            // border: '1px solid red',
            right: { xs: 20, lg: '6%', xl: '10%' },
          }}
        >
          {!!properties.length && (
            <Carousel
              {...carouselThumb.carouselSettings}
              asNavFor={carouselLarge.nav}
              ref={carouselThumb.carouselRef}
            >
              {properties.map((tour, index) => (
                <ThumbnailItem
                  key={index}
                  tour={tour}
                  selected={carouselLarge.currentIndex === index}
                />
              ))}
            </Carousel>
          )}
        </Stack>
      )}
    </Box>
  );
}

TravelLandingFeatured.propTypes = {
  tours: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ tour }) {
  const theme = useTheme();
  const router = useRouter();
  const { setPropertyToView } = usePropertyContext();

  const renderOverlay = (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
          endColor: `${theme.palette.common.black} 95%`,
        }),
        backgroundColor: alpha(theme.palette.common.black, 0.24),
        top: 0,
        left: 0,
        zIndex: 8,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  const onClickBook = () => {
    setPropertyToView(tour);
    router.push(paths.listingsView(tour?.id));
  };

  return (
    <Box>
      <Stack spacing={1} mb={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" color="secondary">
          Featured
        </Typography>
        <Typography variant="h2">Residential Properties in Dubai</Typography>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          position: 'relative',
          color: 'common.white',
          justifyContent: 'center',
        }}
      >
        <Stack
          alignItems="center"
          sx={{
            zIndex: 9,
            py: { xs: 20, md: 0 },
            position: { md: 'absolute' },
          }}
        >
          <Typography
            variant="h4"
            color="secondary"
            sx={{
              border: `1px solid ${theme.palette.secondary.main}`,
              px: 4,
              py: 1,
              borderRadius: 20,
            }}
          >
            Featured
          </Typography>
          <Typography variant="h2" sx={{ maxWidth: 780 }}>
            {tour.title}
          </Typography>

          <Stack
            alignItems="center"
            spacing={{ xs: 2.5, md: 5 }}
            direction={{ xs: 'column', md: 'row' }}
            sx={{ my: 5 }}
          >
            <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              <Iconify icon="carbon:location" width={24} sx={{ mr: 1, color: 'secondary.main' }} />
              {tour.area}
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              <Iconify icon="mdi:users" width={24} sx={{ mr: 1, color: 'secondary.main' }} />
              {tour.guests}
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              <Iconify
                icon="material-symbols:bed"
                width={24}
                sx={{ mr: 1, color: 'secondary.main' }}
              />
              {tour.beds?.length}
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              <Iconify icon="solar:bath-bold" width={24} sx={{ mr: 1, color: 'secondary.main' }} />
              {tour.bath}
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              <Iconify icon="carbon:currency" width={24} sx={{ mr: 1, color: 'secondary.main' }} />
              {`Starting at ${fCurrency(tour.rentPerNight)}`}
            </Stack>
          </Stack>

          <Button variant="contained" size="large" color="secondary" onClick={onClickBook}>
            Book Now
          </Button>
        </Stack>

        <Box
          sx={{
            width: 1,
            height: 1,
            position: {
              xs: 'absolute',
              md: 'relative',
            },
          }}
        >
          {renderOverlay}

          <Image
            alt="hero"
            src={tour?.images[0]}
            sx={{
              width: 1,
              height: { xs: 1, md: '100vh' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

CarouselItem.propTypes = {
  tour: PropTypes.object,
};

// ----------------------------------------------------------------------

function ThumbnailItem({ tour, selected }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2.5}
      sx={{
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        color: 'common.white',
        ...(selected && {
          borderRadius: 2,
          ...bgBlur({
            opacity: 0.08,
            color: theme.palette.common.white,
          }),
        }),
      }}
    >
      <Avatar src={tour?.images[0]} sx={{ width: 48, height: 48 }} />

      <Stack spacing={0.5}>
        <TextMaxLine variant="h6" line={1}>
          {tour.title}
        </TextMaxLine>

        <Stack direction="row" alignItems="center">
          <Iconify icon="carbon:location" sx={{ mr: 1, color: 'secondary.main' }} />
          <TextMaxLine variant="caption" line={1} sx={{ opacity: 0.48 }}>
            {tour.area}
          </TextMaxLine>
        </Stack>
      </Stack>
    </Stack>
  );
}

ThumbnailItem.propTypes = {
  tour: PropTypes.object,
  selected: PropTypes.bool,
};
