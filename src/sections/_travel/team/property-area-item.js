import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { bgGradient } from 'src/theme/css';
import { useRouter } from 'src/routes/hooks';
import { varHover, varTranHover } from 'src/components/animate';
import { usePropertyContext } from 'src/context/PropertyContext';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  opacity: 0,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  '&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

export default function PropertyAreaItem({ property }) {
  const router = useRouter();
  const { filters, setFilters } = usePropertyContext();
  const { title, image, description } = property;

  const theme = useTheme();

  const onClickViewProperties = () => {
    setFilters({ ...filters, location: title });
    router.push(paths.listings);
  };
  return (
    <Box
      component={m.div}
      whileHover="hover"
      variants={varHover(1.05)}
      transition={varTranHover()}
      sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
    >
      <StyledOverlay>
        <Stack
          spacing={1}
          alignItems="center"
          sx={{
            width: 1,
            zIndex: 9,
            bottom: 24,
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <Typography variant="h3" align="center">
            {title}
          </Typography>

          <Stack p={2}>
            <Typography>{description}</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 'fit-content', m: 'auto', mt: 1 }}
              onClick={onClickViewProperties}
            >
              View Properties
            </Button>
          </Stack>
        </Stack>
      </StyledOverlay>

      <m.div variants={varHover()} transition={varTranHover()}>
        <Box sx={{ position: 'relative', m: 'auto' }}>
          <Typography
            variant="h3"
            align="center"
            color="white"
            sx={{
              width: 1,
              zIndex: 9,
              bottom: 0,
              pb: 10,

              position: 'absolute',
              color: 'common.white',
              textShadow: 'revert',
              ...bgGradient({
                startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
                endColor: `${theme.palette.common.black} 75%`,
              }),
            }}
          >
            {title}
          </Typography>
          <Image src={image} alt={title} ratio="4/6" sx={{ zIndex: -1 }} />
        </Box>
      </m.div>
    </Box>
  );
}

PropertyAreaItem.propTypes = {
  property: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};
