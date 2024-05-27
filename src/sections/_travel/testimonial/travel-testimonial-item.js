import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TestimonialItem({ testimonial, sx, ...other }) {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" spacing={1}>
        <Avatar alt="T" />
        <Stack>
          <Typography variant="subtitle1">{testimonial.name}</Typography>
          <Typography variant="body2">Some Title</Typography>
        </Stack>
      </Stack>

      <Rating size="small" value={testimonial.ratingNumber} readOnly />

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {testimonial.review}
      </Typography>
    </Stack>
  );
}

TestimonialItem.propTypes = {
  sx: PropTypes.object,
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    review: PropTypes.string,
    ratingNumber: PropTypes.number,
    createdAt: PropTypes.instanceOf(Date),
  }),
};
