import { Helmet } from 'react-helmet-async';

import CareerPostView from 'src/sections/_career/view/career-post-view';

// ----------------------------------------------------------------------

export default function CareerPostPage() {
  return (
    <>
      <Helmet>
        <title>The A-Z Of Event Post</title>
      </Helmet>

      <CareerPostView />
    </>
  );
}
