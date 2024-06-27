import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fDateTime } from 'src/utils/format-time';
import { _features, TERMS_AND_CONDITIONS_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------

export default function TravelTourDetailsSummary({ propertyToView }) {
  const { features, termsAndCondition, childrenAllowed, content, time } = propertyToView;

  const { checkInHour, checkOutHour } = time;

  return (
    <Stack spacing={5}>


      {/* {renderDetails} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2}>
        <Typography variant="h3">Description</Typography>
        <Box dangerouslySetInnerHTML={{ __html: content }} />
        {/* <Box dangerouslySetHTML={content} /> */}
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6"> Services</Typography>

        <Box
          rowGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {_features.map((service) => (
            <Stack
              key={service}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(!features.includes(service) && {
                  color: 'text.disabled',
                }),
              }}
            >
              <Iconify
                icon="carbon:checkmark"
                sx={{
                  color: 'primary.main',
                  ...(!features.includes(service) && {
                    color: 'text.disabled',
                  }),
                }}
              />
              {service}
            </Stack>
          ))}
        </Box>
      </Stack>

      <Stack spacing={2} mt={6}>
        <Typography variant="h6"> Terms & Conditions</Typography>

        <Box
          rowGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {TERMS_AND_CONDITIONS_OPTIONS.map((terms) => (
            <Stack key={terms.label} spacing={1} direction="row" alignItems="center">
              {termsAndCondition?.includes(terms.label) ? (
                <Iconify
                  icon="icon-park-outline:check-one"
                  sx={{
                    color: 'primary.main',
                  }}
                />
              ) : (
                <Iconify
                  icon="material-symbols:block"
                  sx={{
                    color: 'error.main',
                  }}
                />
              )}
              {terms.label}
            </Stack>
          ))}
          <Stack spacing={1} direction="row" alignItems="center">
            {childrenAllowed ? (
              <Iconify
                icon="icon-park-outline:check-one"
                sx={{
                  color: 'success.main',
                }}
              />
            ) : (
              <Iconify
                icon="material-symbols:block"
                sx={{
                  color: 'error.main',
                }}
              />
            )}
            Children Allowed
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

TravelTourDetailsSummary.propTypes = {
  propertyToView: PropTypes.object,
};

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};

// ----------------------------------------------------------------------

function HighlightItem({ label, text }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 2,
            borderRadius: 1,
            bgcolor: 'currentColor',
            mr: 1.5,
          }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}

HighlightItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};
