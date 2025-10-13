import type { ComponentPropsWithoutRef } from 'react';
import { LeadingSpacer } from '@/components/LeadingSpacer';

type HeadingProps = ComponentPropsWithoutRef<'h1' | 'h2' | 'h3'>;

export const Heading = {
  h1: ({ children, className }: HeadingProps) => (
    <h1 className={className}>
      <LeadingSpacer>#</LeadingSpacer>
      {children}
    </h1>
  ),
  h2: ({ children, className }: HeadingProps) => (
    <h2 className={className}>
      <LeadingSpacer>#</LeadingSpacer>
      {children}
    </h2>
  ),
  h3: ({ children, className }: HeadingProps) => (
    <h3 className={className}>
      <LeadingSpacer>#</LeadingSpacer>
      {children}
    </h3>
  ),
};
