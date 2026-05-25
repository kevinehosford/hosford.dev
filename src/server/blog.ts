import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { createServerFn } from '@tanstack/react-start';

export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  tags: Array<string>;
  excerpt: string;
  draft: boolean;
}

export interface BlogPost {
  metadata: BlogMetadata;
  html: string;
}

const blogFiles = import.meta.glob<string>('../data/blog/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function slugFromPath(path: string): string {
  const segments = path.split('/');
  return segments[segments.length - 2] ?? '';
}

function remarkDirectiveToHast() {
  return (tree: unknown) => {
    visit(tree as never, (node: any) => {
      if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
        const data = node.data || (node.data = {});
        data.hName = node.name;
        data.hProperties = node.attributes ?? {};
      }
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkDirectiveToHast)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeHighlight, { detect: false })
  .use(rehypeStringify, { allowDangerousHtml: true });

async function compileMarkdown(md: string): Promise<string> {
  const file = await processor.process(md);
  return String(file);
}

interface ParsedBlogFile {
  metadata: BlogMetadata;
  rawMd: string;
}

function parseBlogFile(path: string, raw: string): ParsedBlogFile {
  const parsed = matter(raw);
  const data = parsed.data as Partial<BlogMetadata>;
  const slug = data.slug ?? slugFromPath(path);

  const metadata: BlogMetadata = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? '',
    draft: data.draft === true,
  };

  return { metadata, rawMd: parsed.content };
}

function isVisible(metadata: BlogMetadata): boolean {
  if (!metadata.draft) return true;
  return import.meta.env.DEV;
}

export interface BlogIndexEntry {
  metadata: BlogMetadata;
}

export const getAllBlogPosts = createServerFn({ method: 'GET' }).handler((): Array<BlogIndexEntry> => {
  return Object.entries(blogFiles)
    .map(([path, raw]) => parseBlogFile(path, raw))
    .filter((entry) => isVisible(entry.metadata))
    .sort((a, b) => b.metadata.date.localeCompare(a.metadata.date))
    .map(({ metadata }) => ({ metadata }));
});

export const getBlogPostBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<BlogPost | null> => {
    const found = Object.entries(blogFiles)
      .map(([path, raw]) => parseBlogFile(path, raw))
      .find((entry) => entry.metadata.slug === slug);

    if (!found) return null;
    if (!isVisible(found.metadata)) return null;

    const html = await compileMarkdown(found.rawMd);
    return { metadata: found.metadata, html };
  });
