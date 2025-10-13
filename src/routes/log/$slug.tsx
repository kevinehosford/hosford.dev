import { createFileRoute, notFound } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLogBySlug } from '../../server/logs';

export const Route = createFileRoute('/log/$slug')({
  loader: async ({ params }) => {
    const log = await getLogBySlug({ data: params.slug });

    if (!log) {
      throw notFound();
    }

    return { log };
  },
  component: LogDetail,
});

function LogDetail() {
  const { log } = Route.useLoaderData();

  return (
    <main>
      <article>
        <header>
          <h1>{log.title}</h1>
          {(log.formattedDate || log.tags.length > 0) && (
            <div className="log-meta">
              {log.formattedDate && (
                <time className="log-date" dateTime={log.date}>
                  {log.formattedDate}
                </time>
              )}
              {log.tags.length > 0 && (
                <ul className="tag-list">
                  {log.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </header>

        <Markdown remarkPlugins={[remarkGfm]}>{log.content}</Markdown>
      </article>
    </main>
  );
}
