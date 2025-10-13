import { createServerFn } from '@tanstack/react-start';

export interface LogMetadata {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  tags: Array<string>;
  filename: string;
  excerpt: string;
}

export interface LogPost extends LogMetadata {
  content: string;
}

// Import all markdown files using Vite's glob import
const logFiles = import.meta.glob<string>('../data/logs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function formatDate(dateStr: string): string {
  const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const [, year, month] = dateMatch;
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const weekMatch = dateStr.match(/^(\d{4})-W(\d{2})$/);
  if (weekMatch) {
    const [, year, week] = weekMatch;
    const date = new Date(Number.parseInt(year), 0, 1 + (Number.parseInt(week) - 1) * 7);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

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

    return { slug, title, date, formattedDate, tags, filename, excerpt };
  }

  if (weekMatch) {
    const date = weekMatch[1];
    const title = weekMatch[2].replace(/-/g, ' ');
    const slug = weekMatch[2];
    const formattedDate = formatDate(date);

    return { slug, title, date, formattedDate, tags, filename, excerpt };
  }

  return {
    slug: baseName,
    title: baseName.replace(/-/g, ' '),
    date: '',
    formattedDate: '',
    tags,
    filename,
    excerpt,
  };
}

export const getAllLogs = createServerFn({ method: 'GET' }).handler(() => {
  const logs = Object.entries(logFiles).map(([path, content]) => {
    const filename = path.split('/').pop() || '';
    return parseFilename(filename, content);
  });

  return logs.sort((a, b) => b.date.localeCompare(a.date));
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

    return { ...metadata, content };
  });
