import { createFileRoute } from '@tanstack/react-router';
import { getAllLogs } from '../../server/logs';
import { Markdown } from '@/components/markdown';
import { TagsList } from '@/components/TagsList';
import { TagListItem } from '@/components/TagListItem';
import { Tag } from '@/components/Tag';
import { Heading } from '@/components/Heading';

export const Route = createFileRoute('/log/')({
  ssr: 'data-only',
  loader: async () => {
    const logs = await getAllLogs();
    return { logs };
  },
  component: LogList,
});

function LogList() {
  const { logs } = Route.useLoaderData();

  return (
    <main className="space-y-12">
      <Heading.h1>dev log</Heading.h1>

      {logs.length === 0 ? (
        <p>no logs yet</p>
      ) : (
        logs.map((log) => (
          <section key={log.metadata.filename} className="space-y-4">
            <Heading.h2>{log.metadata.title}</Heading.h2>

            <aside>
              <p>
                date:
                <time dateTime={log.metadata.date}>{log.metadata.formattedDate}</time>
              </p>

              <TagsList>
                tags:
                {log.metadata.tags.map((tag) => (
                  <TagListItem key={tag}>
                    <Tag>{tag}</Tag>
                  </TagListItem>
                ))}
              </TagsList>
            </aside>
            <Markdown>{log.md}</Markdown>
          </section>
        ))
      )}
    </main>
  );
}
