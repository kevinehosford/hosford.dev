import { Link, createFileRoute } from '@tanstack/react-router';
import { getAllLogs } from '../../server/logs';

export const Route = createFileRoute('/log/')({
  loader: async () => {
    const logs = await getAllLogs();
    return { logs };
  },
  component: LogList,
});

function LogList() {
  const { logs } = Route.useLoaderData();

  return (
    <main>
      <h1>dev log</h1>

      {logs.length === 0 ? (
        <p>no logs yet</p>
      ) : (
        <ul className="log-list">
          {logs.map((log) => (
            <li key={log.slug}>
              <article className="log-card">
                <header>
                  <h2>
                    <Link className="log-link" to="/log/$slug" params={{ slug: log.slug }}>
                      {log.title}
                    </Link>
                  </h2>
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
                {log.excerpt && <p className="log-excerpt">{log.excerpt}</p>}
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
