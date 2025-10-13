import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Heading } from '@/components/Heading';
import { LeadingSpacer } from '@/components/LeadingSpacer';

type ReactMarkdownProps = ComponentPropsWithoutRef<typeof ReactMarkdown>;

type MarkdownProps = ReactMarkdownProps;

type Components = NonNullable<ReactMarkdownProps['components']>;

function wrap<T extends keyof Components>(elementType: T, prefix: ReactNode): Pick<Components, T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component = (({ children, className }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Element = elementType as any;
    return (
      <Element className={twMerge('flex', className)}>
        {prefix} <span>{children}</span>
      </Element>
    );
  }) as Components[T];

  return {
    [elementType]: component,
  } as Pick<Components, T>;
}

export function Markdown(props: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: Heading.h1,
        h2: Heading.h2,
        h3: Heading.h3,
        ...wrap('li', <LeadingSpacer variant="small">-</LeadingSpacer>),
      }}
      {...props}
    />
  );
}
