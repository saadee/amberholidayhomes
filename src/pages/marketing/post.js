import { Helmet } from 'react-helmet-async';

import MarketingPostView from 'src/sections/_marketing/view/marketing-post-view';

// ----------------------------------------------------------------------

export default function MarketingPostPage() {
  return (
    <>
      <Helmet>
        <title>The A-Z Of Event Post</title>
      </Helmet>

      <MarketingPostView />
    </>
  );
}
