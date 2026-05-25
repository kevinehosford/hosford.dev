import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { getBlogPostBySlug } from '../../server/blog';
import { Heading } from '@/components/Heading';
import { TagsList } from '@/components/TagsList';
import { TagListItem } from '@/components/TagListItem';
import { Tag } from '@/components/Tag';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

export const Route = createFileRoute('/blog/$slug')({
  ssr: true,
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug({ data: params.slug });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const title = `${post.metadata.title} — Kevin Hosford`;
    const description = post.metadata.excerpt || `${post.metadata.title} — a post on hosford.dev`;
    const url = `${SITE_URL}/blog/${post.metadata.slug}`;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: SITE_NAME },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:site', content: TWITTER_HANDLE },
        { name: 'twitter:creator', content: TWITTER_HANDLE },
      ],
      links: [{ rel: 'canonical', href: url }],
    };
  },
  notFoundComponent: BlogPostNotFound,
  component: BlogPostPage,
});

function BlogPostNotFound() {
  return (
    <main className="mx-auto space-y-6 lg:max-w-centered">
      <Heading.h1>not found</Heading.h1>
      <p>
        That post does not exist. <Link to="/blog">Back to blog</Link>.
      </p>
    </main>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <main className="mx-auto space-y-8 lg:max-w-centered">
      <header className="space-y-3">
        <Heading.h1>{post.metadata.title}</Heading.h1>
        {post.metadata.tags.length > 0 && (
          <TagsList>
            {post.metadata.tags.map((tag) => (
              <TagListItem key={tag}>
                <Tag>{tag}</Tag>
              </TagListItem>
            ))}
          </TagsList>
        )}
      </header>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
