import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function TravelTourDetailsHeader({ tour }) {
  const { ratingNumber, favorited, title, rooms, bath, guests, propertySize, address } = tour;

  const [favorite, setFavorite] = useState(favorited);

  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleChangeFavorite = useCallback((event) => {
    setFavorite(event.target.checked);
  }, []);

  return (
    <Box my={5}>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 1,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" flexShrink={0}>
          <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" />
          </IconButton>

          <Checkbox
            color="error"
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center">
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
          </Box>
          ({fShortenNumber(4587)} reviews)
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          {address}
        </Stack>
      </Stack>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {_socials.map((social) => (
          <MenuItem key={social.value} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            Share via {social.label}
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
}

TravelTourDetailsHeader.propTypes = {
  tour: PropTypes.object,
};
