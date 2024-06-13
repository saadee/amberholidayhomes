import { useState, useEffect } from 'react';

import { alpha } from '@mui/system';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { usePropertyContext } from 'src/context/PropertyContext';
import {
  _tours,
  _members,
  // _travelPosts, _testimonials
} from 'src/_mock';

import PropertyAreas from '../team/property-areas';
import TravelNewsletter from '../travel-newsletter';
// import TravelNewsletter from '../travel-newsletter';
import TravelFilters from '../filters/travel-filters';
import TravelTestimonial from '../testimonial/travel-testimonial';
import TravelLandingSummary from '../landing/travel-landing-summary';
import TravelLandingFeatured from '../landing/travel-landing-featured';
import TravelLandingTourOffers from '../landing/travel-landing-tour-offers';
import TravelLandingListWithUs from '../landing/travel-landing-list-with-us';
// import TravelLandingIntroduce from '../landing/travel-landing-introduce';
// import BlogTravelLandingLatestPosts from '../../blog/travel/travel-landing-posts';
import TravelLandingFavoriteDestinations from '../landing/travel-landing-favorite-destinations';

// ----------------------------------------------------------------------

export default function TravelLandingView() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { setFilters } = usePropertyContext();

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    setFilters({
      bath: null,
      rooms: null,
      propertyType: null,
      location: null,
      guests: {
        adults: 0,
        children: 0,
      },
      dates: [null, null],
    });
  }, [setFilters]);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {!videoLoaded && (
          <img
            src="https://firebasestorage.googleapis.com/v0/b/amberholidayhomes.appspot.com/o/GuestWebAssests%2FScreenshot%202024-05-10%20at%205.32.11%E2%80%AFPM.png?alt=media&token=ea46fbf5-b4d9-4713-8826-ccd9d6a95010"
            alt="Video Thumbnail"
            style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          />
        )}
        <video
          className="heroBannerVideo"
          style={{
            filter: 'brightness(.8)',
            objectFit: 'cover',
            display: videoLoaded ? 'block' : 'none',
          }}
          width="100%"
          src="https://firebasestorage.googleapis.com/v0/b/amberholidayhomes.appspot.com/o/GuestWebAssests%2Fbanner1.mp4?alt=media&token=d504bb50-444b-43b9-b543-4615eeb03afd"
          muted
          autoPlay
          loop
          onLoadedData={handleVideoLoaded}
        />
        {/* <TravelLandingHero tours={_tours.slice(0, 5)} /> */}

        <Container
          sx={{
            zIndex: 999,
            mb: { md: 10 },
            left: { md: 0 },
            right: { md: 0 },
            bottom: { xs: 20, md: 0 },
            mx: { md: 'auto' },
            pt: { xs: 3, md: 0 },
            position: { xs: 'absolute' },
          }}
        >
          <Box
            sx={{
              background: 'transparent',
              textAlign: 'center',
              mb: { md: 8, xs: 4 },
            }}
          >
            <Typography variant="h1" color="white" sx={{ mb: 3 }}>
              Vacations Rental Management In Dubai.
            </Typography>
            <Typography variant="h4" color="white">
              Immerse yourself in the extraordinary vacation rentals of Dubai
            </Typography>
          </Box>
          <TravelFilters
            sx={{
              color: { md: 'common.white' },
              bgcolor: (theme) => ({
                // xs: 'background.neutral',
                xs: alpha(theme.palette.common.black, 0.8),
              }),
            }}
          />
        </Container>
      </Box>

      {/* <TravelLandingIntroduce /> */}

      <TravelLandingFavoriteDestinations tours={_tours.slice(0, 4)} />

      <PropertyAreas members={_members} />

      <TravelLandingSummary />

      <TravelLandingTourOffers />
      <TravelLandingFeatured />

      <TravelLandingListWithUs tours={_tours.slice(0, 8)} />

      {/* <BlogTravelLandingLatestPosts posts={_travelPosts.slice(2, 6)} /> */}

      <TravelTestimonial />

      <TravelNewsletter />
    </>
  );
}
