import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Link from '@mui/material/Link';
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { _socials } from 'src/_mock';
import Logo from 'src/components/logo';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import TextMaxLine from 'src/components/text-max-line';
import { useRouter, usePathname } from 'src/routes/hooks';
import { usePropertyContext } from 'src/context/PropertyContext';

// ----------------------------------------------------------------------

// const StyledAppStoreButton = styled(Button)(({ theme }) => ({
//   flexShrink: 0,
//   padding: '5px 12px',
//   color: theme.palette.common.white,
//   border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
//   background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
//   [`& .${buttonClasses.startIcon}`]: {
//     marginLeft: 0,
//   },
// }));

// ----------------------------------------------------------------------

export default function Footer() {
  const router = useRouter();
  const { properties, setPropertyToView } = usePropertyContext();
  const [sortedProperties, setSortedProperties] = useState([]);

  useEffect(() => {
    const sorted = sortByCreatedAt(properties);
    setSortedProperties(sorted?.slice(0, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);
  // const mdUp = useResponsive('up', 'md');

  // const pathname = usePathname();

  // const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  // const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  // const renderLists = mdUp ? desktopList : mobileList;

  // const isHome = pathname === '/';

  // const simpleFooter = (
  //   <Container sx={{ py: 8, textAlign: 'center' }}>
  //     <Logo single />

  //     <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
  //       © 2024. All rights reserved
  //     </Typography>
  //   </Container>
  // );
  const sortByCreatedAt = (prop) =>
    prop.sort((a, b) => {
      const dateA = new Date(a.createdAt.toDate());
      const dateB = new Date(b.createdAt.toDate());
      return dateB - dateA;
    });

  const onClickProperty = (tour) => {
    setPropertyToView(tour);
    router.push(paths.listingsView(tour?.id));
  };

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          // px: 0,
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={5} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Experience luxury redefined with Amber Holiday Homes in Dubai. Discover our
                  handpicked collection of exquisite vacation rentals, offering unforgettable stays
                  in prime locations. Indulge in personalized service and create cherished memories
                  with us.
                </Typography>
              </Stack>

              {/* <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h6">Community</Typography>
                <Link variant="body2" sx={{ color: 'text.primary' }}>
                  Documentation
                </Link>

                <Link variant="body2" sx={{ color: 'text.primary' }}>
                  Changelog
                </Link>

                <Link variant="body2" sx={{ color: 'text.primary' }}>
                  Contributing
                </Link>
              </Stack> */}

              {/* <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">Let’s stay in touch</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Ubscribe to our newsletter to receive latest articles to your inbox weekly.
                  </Typography>
                </Stack>

                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="Email address"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" color="inherit" size="large" sx={{ mr: -1.25 }}>
                          Subscribe
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack> */}

              {/* <Stack spacing={2}>
                <Typography variant="h6">Apps</Typography>
                <AppStoreButton />
              </Stack> */}
            </Stack>
          </Grid>

          <Grid xs={12} md={8}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={5}
              justifyContent="space-between"
            >
              <Stack>
                <Typography variant="h4" mb={2}>
                  Latest Listings
                </Typography>
                {sortedProperties?.map((tour, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    alignItems="center"
                    spacing={2.5}
                    onClick={() => onClickProperty(tour)}
                    sx={{
                      ':hover': {
                        bgcolor: 'background.neutral',
                      },
                      borderRadius: '10px',
                      py: 1,
                      cursor: 'pointer',
                      color: 'common.white',
                    }}
                  >
                    <Avatar src={tour?.images[0]} sx={{ width: 60, height: 60 }} />

                    <Stack spacing={0.5}>
                      <TextMaxLine variant="subtitle1" line={1} sx={{ color: 'text.primary' }}>
                        {tour.title}
                      </TextMaxLine>

                      <Stack direction="row" alignItems="center">
                        <Iconify icon="carbon:location" sx={{ mr: 1, color: 'secondary.main' }} />
                        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.secondary' }}>
                          {tour.area}
                        </TextMaxLine>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
                <Stack />
              </Stack>
              <Stack sx={{ maxWidth: { md: 300 } }}>
                <Typography variant="h4" mb={2}>
                  Reach Us At
                </Typography>

                <Stack spacing={2} direction="row" mb={2}>
                  <Iconify icon="ph:building-bold" width={40} />
                  <Typography variant="body2">
                    Office Number 2102, Burj Al Salam, Sheikh Zayed Road, Trade Centre 1 - Dubai
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={2}>
                  <Iconify icon="material-symbols-light:mail-outline" width={30} />
                  <Typography
                    variant="body2"
                    component="a"
                    href="mailto:holidayhomes@amberhomes.ae"
                    sx={{ color: 'text.primary' }}
                  >
                    Holiday@amberhomes.ae
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={2}>
                  <Iconify icon="ic:baseline-call" width={30} />
                  <Typography
                    variant="body2"
                    component="a"
                    href="tel:+971523310833"
                    sx={{ color: 'text.primary' }}
                  >
                    +971-52-331-0833
                  </Typography>
                </Stack>
                <Stack spacing={2} mt={2}>
                  <Typography variant="h4">Follow Us</Typography>
                  <Stack direction="row" alignItems="center">
                    {_socials.map((social) => (
                      <IconButton key={social.value} color="primary">
                        <Iconify icon={social.icon} width={30} />
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" align="center" sx={{ color: 'text.secondary' }}>
            Copyright 2023 | Amber Homes Holiday™. All Rights Reserved.
          </Typography>

          {/* <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Help Center
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack> */}
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

// function AppStoreButton({ ...other }) {
//   return (
//     <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
//       <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download on the
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Apple Store
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>

//       <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download from
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Google Play
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>
//     </Stack>
//   );
// }
