import { createServerFn } from '@tanstack/react-start';

export interface LogMetadata {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  tags: Array<string>;
  filename: string;
  excerpt: string;
  md: string;
}

export interface LogPost {
  metadata: LogMetadata;
  md: string;
}

// Import all markdown files using Vite's glob import
const logFiles = import.meta.glob<string>('../data/logs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function formatDate(dateStr: string): string {
  // FUTURE: maybe format
  return dateStr;
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n').filter((line) => line.trim() !== '');

  for (const line of lines) {
    if (line.startsWith('#')) continue;
    if (line.trim() === '') continue;

    const sentences = line.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length > 0) {
      return sentences.slice(0, 2).join(' ').trim();
    }

    if (line.length > 20) {
      return line.substring(0, 150).trim() + '...';
    }
  }

  return '';
}

function getMetadataMd({ title, tags, date }: Pick<LogMetadata, 'title' | 'tags' | 'date'>): string {
  return `
  ## ${date ? `${date} - ` : ''}${title}
  ${tags.map((tag) => `- ${tag}`).join('\n')}
  `;
}

function parseFilename(filename: string, content: string): LogMetadata {
  const nameWithoutExt = filename.replace(/\.md$/, '');

  let tags: Array<string> = [];
  let baseName = nameWithoutExt;

  const tagMatch = nameWithoutExt.match(/\[([^\]]+)\]/);
  if (tagMatch) {
    tags = tagMatch[1].split(',').map((tag) => tag.trim());
    baseName = nameWithoutExt.replace(/\[([^\]]+)\]/, '').trim();
  }

  const dateMatch = baseName.match(/^(\d{4}-\d{2}-\d{2})-(.+)/);
  const weekMatch = baseName.match(/^(\d{4}-W\d{2})-(.+)/);

  const excerpt = extractExcerpt(content);

  if (dateMatch) {
    const date = dateMatch[1];
    const title = dateMatch[2].replace(/-/g, ' ');
    const slug = dateMatch[2];
    const formattedDate = formatDate(date);

    return { slug, title, date, formattedDate, tags, filename, excerpt, md: getMetadataMd({ title, tags, date }) };
  }

  if (weekMatch) {
    const date = weekMatch[1];
    const title = weekMatch[2].replace(/-/g, ' ');
    const slug = weekMatch[2];
    const formattedDate = formatDate(date);

    return { slug, title, date, formattedDate, tags, filename, excerpt, md: getMetadataMd({ title, tags, date }) };
  }

  return {
    slug: baseName,
    title: baseName.replace(/-/g, ' '),
    date: '',
    formattedDate: '',
    tags,
    filename,
    excerpt,
    md: getMetadataMd({ title: baseName.replace(/-/g, ' '), tags, date: '' }),
  };
}

export const getAllLogs = createServerFn({ method: 'GET' }).handler((): Array<LogPost> => {
  const logs = Object.entries(logFiles).map(([path, md]) => {
    const filename = path.split('/').pop() || '';

    return {
      filename,
      metadata: parseFilename(filename, md),
      md: md,
    };
  });

  return logs.sort((a, b) => b.filename.localeCompare(a.filename));
});

export const getLogBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }): LogPost | null => {
    const matchingEntry = Object.entries(logFiles).find(([path, content]) => {
      const filename = path.split('/').pop() || '';
      const metadata = parseFilename(filename, content);
      return metadata.slug === slug || metadata.date === slug;
    });

    if (!matchingEntry) {
      return null;
    }

    const [path, content] = matchingEntry;
    const filename = path.split('/').pop() || '';
    const metadata = parseFilename(filename, content);

    return { metadata, md: content };
  });
