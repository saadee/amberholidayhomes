/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { fCurrency } from 'src/utils/format-number';
import TextMaxLine from 'src/components/text-max-line';
import { usePropertyContext } from 'src/context/PropertyContext';

// ----------------------------------------------------------------------

export default function TravelTourItem({ property }) {
  const { slug, images, title, discountRatio, bath, guests, rentPerNight, address, rooms, id,propertyType } =
    property;
  const router = useRouter();
  const { setPropertyToView } = usePropertyContext();
  // console.log({ property });

  // const [favorite, setFavorite] = useState(favorited);

  function deductPercentage(amount, percentage) {
    // Calculate the deduction
    const deduction = (amount * percentage) / 100;
    // Subtract the deduction from the amount
    const finalAmount = amount - deduction;
    return finalAmount;
  }

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 1.5,
          pl: 2,
          pr: 1.5,
          top: 0,
          width: 1,
          zIndex: 9,
          position: 'absolute',
        }}
      >
        <Stack
          spacing={0.5}
          direction="row"
          sx={{
            px: 1,
            borderRadius: 0.75,
            typography: 'subtitle2',
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          }}
        >
          {discountRatio ? (
            <>
              <Box
                sx={{
                  color: 'grey.500',
                  textDecoration: 'line-through',
                  mr: 0.5,
                }}
              >
                {rentPerNight}
              </Box>
              <Typography color="" fontWeight="bold">
                {' '}
                {fCurrency(deductPercentage(rentPerNight, discountRatio))}
              </Typography>
            </>
          ) : (
            fCurrency(rentPerNight)
          )}
        </Stack>
        {discountRatio > 0 && <Chip label={`${discountRatio}% OFF`} color="secondary" />}

        {/* <Checkbox
          color="error"
          checked={favorite}
          onChange={handleChangeFavorite}
          icon={<Iconify icon="carbon:favorite" />}
          checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          sx={{ color: 'common.white' }}
        /> */}
      </Stack>

      <Image alt={slug} src={images[0]} ratio="1/1" />

      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <TextMaxLine persistent line={1}>
            {address}
          </TextMaxLine>
        </Typography>

        <Box
          sx={{
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => {
            setPropertyToView(property);
            router.push(paths.listingsView(id));
          }}
        >
          <TextMaxLine variant="h6" persistent>
            {title}
          </TextMaxLine>
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="mdi:users" width={25} sx={{ mr: 1 }} /> {propertyType}
        </Stack>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="mdi:users" width={25} sx={{ mr: 1 }} /> {guests}
        </Stack>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="material-symbols:bed" width={25} sx={{ mr: 1 }} /> {rooms}
        </Stack>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="solar:bath-bold" width={25} sx={{ mr: 1 }} /> {bath}
        </Stack>

        {/* <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
          </Box>
        </Stack> */}
      </Stack>
    </Card>
  );
}

TravelTourItem.propTypes = {
  property: PropTypes.shape({
    coverUrl: PropTypes.string,
    duration: PropTypes.string,
    favorited: PropTypes.bool,
    location: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    slug: PropTypes.string,
    ratingNumber: PropTypes.number,
  }),
};
