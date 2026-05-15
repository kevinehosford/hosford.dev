import { createFileRoute } from '@tanstack/react-router';
import { getAllLogs } from '../../server/logs';
import { Markdown } from '@/components/markdown';
import { TagsList } from '@/components/TagsList';
import { TagListItem } from '@/components/TagListItem';
import { Tag } from '@/components/Tag';
import { Heading } from '@/components/Heading';
import { Datum, Label, Value } from '@/components/Datum';
import { TermType } from '@/components/TermType';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

const LOG_TITLE = 'Dev log — Kevin Hosford';
const LOG_DESCRIPTION =
  'Kevin Hosford — full-stack engineer. Dev log: weekly notes on large-scale frontend, full-stack rewrites, and agent-tooling infrastructure at Axiom.';
const LOG_URL = `${SITE_URL}/log`;

export const Route = createFileRoute('/log/')({
  ssr: 'data-only',
  head: () => ({
    meta: [
      { title: LOG_TITLE },
      { name: 'description', content: LOG_DESCRIPTION },
      { property: 'og:title', content: LOG_TITLE },
      { property: 'og:description', content: LOG_DESCRIPTION },
      { property: 'og:url', content: LOG_URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: LOG_TITLE },
      { name: 'twitter:description', content: LOG_DESCRIPTION },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      { name: 'twitter:creator', content: TWITTER_HANDLE },
    ],
    links: [{ rel: 'canonical', href: LOG_URL }],
  }),
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
