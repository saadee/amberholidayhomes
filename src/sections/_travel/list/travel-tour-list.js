import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { usePropertyContext } from 'src/context/PropertyContext';

import TravelTourItem from './travel-tour-item';
import TravelTourItemSkeleton from './travel-tour-item-skeleton';

// ----------------------------------------------------------------------

export default function TravelTourList({ loading }) {
  const { filterProperties } = usePropertyContext();
  return (
    <>
      <Box
        sx={{
          mb: 20,
          columnGap: 3,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(12)] : filterProperties).map((tour, index) =>
          tour ? (
            <TravelTourItem key={tour.id} property={tour} />
          ) : (
            <TravelTourItemSkeleton key={index} />
          )
        )}
      </Box>

      {/* <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      /> */}
    </>
  );
}

TravelTourList.propTypes = {
  loading: PropTypes.bool,
};
