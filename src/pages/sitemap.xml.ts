import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Readable } from 'stream';
import { SitemapStream, streamToPromise } from 'sitemap';
import { BlogPostState } from '@/types';
import { fetchData } from '@/lib/axios';

// * method to format date for lastmod
const changeDateToString = (date: Date) => date.toISOString();

// Use getServerSideProps to retrieve data from database to a add dynmic links to sitemap
export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  // * lastmod should be formatted
  const defaultLastmod: string = changeDateToString(new Date('2024-02-15'));
  const defaultLink = {
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: defaultLastmod,
  };

  // Define default array of link objects for static pages
  const links: {
    url: string;
    changefreq: string;
    priority: number;
    lastmod: string;
  }[] = [
    { url: '/', ...defaultLink }, // home
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: defaultLastmod,
    }, // about
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: defaultLastmod,
    }, // contact
  ];

  let posts: BlogPostState[] = [];

  // Get data from database
  try {
    posts = await fetchData('/posts');
  } catch (e) {
    console.log(e);
  }

  // Add each blog post link to the `links` dynamically by iterating posts data
  if (posts && posts.length > 0) {
    posts.forEach((post: BlogPostState) => {
      links.push({
        url: `/post/${post.slug}`,
        changefreq: defaultLink.changefreq,
        priority: defaultLink.priority,
        lastmod: changeDateToString(new Date(post.updatedAt)),
      });
    });
  }

  // Setup stream with the `sitemap` methods
  const stream = new SitemapStream({
    hostname: `https://${req.headers.host}`,
  });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream),
  ).then((data) => data.toString());

  res.end(xmlString);

  // Return empty props
  return {
    props: {},
  };
};

// Export empty sitemap component by default
export default function sitemap(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {}
