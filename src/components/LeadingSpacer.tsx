import { twMerge } from 'tailwind-merge';

export const LeadingSpacer = ({ children, variant }: { children: React.ReactNode; variant?: 'small' }) => {
  return (
    <span
      className={twMerge(
        'inline-block',
        variant !== 'small' && 'inline-block min-w-[var(--leading-space)]',
        variant === 'small' && 'min-w-[var(--leading-space-small)]',
      )}
    >
      {children}
    </span>
  );
};
