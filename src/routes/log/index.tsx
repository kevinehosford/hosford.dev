import { createFileRoute } from '@tanstack/react-router';
import { getAllLogs } from '../../server/logs';
import { Markdown } from '@/components/markdown';
import { TagsList } from '@/components/TagsList';
import { TagListItem } from '@/components/TagListItem';
import { Tag } from '@/components/Tag';
import { Heading } from '@/components/Heading';
import { Datum, Label, Value } from '@/components/Datum';
import { TermType } from '@/components/TermType';

export const Route = createFileRoute('/log/')({
  ssr: 'data-only',
  loader: async () => {
    const logs = await getAllLogs();
    return { logs };
  },
  staleTime: Infinity,
  gcTime: Infinity,
  component: LogList,
  shouldReload: () => false,
});

function LogList() {
  const { logs } = Route.useLoaderData();

  return (
    <main className="mx-auto space-y-12 lg:max-w-centered">
      <TermType input="development log" duration={1_500} delay={2_000} className="text-2xl sm:text-4xl" />

      {logs.length === 0 ? (
        <p>no logs yet</p>
      ) : (
        logs.map((log) => (
          <section key={log.metadata.filename} className="space-y-4">
            <Heading.h2>{log.metadata.title}</Heading.h2>

            <aside>
              <Datum>
                <Label>date</Label>
                <Value>
                  <time dateTime={log.metadata.date}>{log.metadata.formattedDate}</time>
                </Value>
              </Datum>

              <Datum>
                <Label>tags</Label>
                <Value>
                  <TagsList>
                    {log.metadata.tags.map((tag) => (
                      <TagListItem key={tag}>
                        <Tag>{tag}</Tag>
                      </TagListItem>
                    ))}
                  </TagsList>
                </Value>
              </Datum>
            </aside>
            <Markdown>{log.md}</Markdown>
          </section>
        ))
      )}
    </main>
  );
}
