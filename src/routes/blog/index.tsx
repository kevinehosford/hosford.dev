import { Link, createFileRoute } from '@tanstack/react-router';
import { getAllBlogPosts } from '../../server/blog';
import { TermType } from '@/components/TermType';
import { Heading } from '@/components/Heading';
import { TagsList } from '@/components/TagsList';
import { TagListItem } from '@/components/TagListItem';
import { Tag } from '@/components/Tag';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

const BLOG_TITLE = 'Blog — Kevin Hosford';
const BLOG_DESCRIPTION =
  'Long-form notes on agent tooling, AI harnesses, and the systems I poke at — by Kevin Hosford.';
const BLOG_URL = `${SITE_URL}/blog`;

export const Route = createFileRoute('/blog/')({
  ssr: true,
  head: () => ({
    meta: [
      { title: BLOG_TITLE },
      { name: 'description', content: BLOG_DESCRIPTION },
      { property: 'og:title', content: BLOG_TITLE },
      { property: 'og:description', content: BLOG_DESCRIPTION },
      { property: 'og:url', content: BLOG_URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: BLOG_TITLE },
      { name: 'twitter:description', content: BLOG_DESCRIPTION },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      { name: 'twitter:creator', content: TWITTER_HANDLE },
    ],
    links: [{ rel: 'canonical', href: BLOG_URL }],
  }),
  loader: async () => {
    const posts = await getAllBlogPosts();
    return { posts };
  },
  staleTime: Infinity,
  gcTime: Infinity,
  component: BlogIndex,
  shouldReload: () => false,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <main className="mx-auto space-y-12 lg:max-w-centered">
      <TermType input="blog" duration={1_000} delay={1_500} className="text-2xl sm:text-4xl" />

      {posts.length === 0 ? (
        <p>no posts yet</p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.metadata.slug} className="space-y-3">
              <Heading.h2>
                <Link to="/blog/$slug" params={{ slug: post.metadata.slug }}>
                  {post.metadata.title}
                </Link>
              </Heading.h2>
              {post.metadata.excerpt && <p>{post.metadata.excerpt}</p>}
              {post.metadata.tags.length > 0 && (
                <TagsList>
                  {post.metadata.tags.map((tag) => (
                    <TagListItem key={tag}>
                      <Tag>{tag}</Tag>
                    </TagListItem>
                  ))}
                </TagsList>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
