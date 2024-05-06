import { Helmet } from 'react-helmet-async';

import TravelPostsView from 'src/sections/_travel/view/travel-posts-view';

// ----------------------------------------------------------------------

export default function TravelPostsPage() {
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>

      <TravelPostsView />
    </>
  );
}
