import { useEffect, useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Heading } from '@/components/Heading';

type TermTypeProps = {
  input: string;
  duration: number;
  delay: number;
  className?: string;
};

export function TermType({ input, duration, delay, className }: TermTypeProps) {
  const [start, setStart] = useState(false);
  const [offset, setOffset] = useState(-1);

  // divide up duration into chunks of input.length
  // compute a slightly randomized delay for each chunk

  useLayoutEffect(() => {
    function doType() {
      if (!start) {
        return;
      }

      return setTimeout(
        () => {
          setOffset((current) => {
            if (current >= input.length - 1) {
              return current;
            }
            return current + 1;
          });

          if (offset < input.length - 1) {
            doType();
          }
        },
        Math.random() * 50 + duration / input.length,
      );
    }

    const interval = doType();

    return () => clearTimeout(interval);
  }, [setOffset, input, duration, start, offset]);

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, delay);
  }, [setStart, delay]);

  return (
    <Heading.h1 className={twMerge('flex items-baseline font-mono whitespace-pre', className)}>
      {input.split('').map((letter, index) => {
        if (index > offset) return null;
        const isCurrentLetter = index === offset;
        return isCurrentLetter ? (
          <span className="relative py-1 leading-none" key={`${letter}-${index}`}>
            <span className="terminal-cursor absolute inset-0 bg-current"></span>
            <span className="terminal-cursor-text relative z-10">{letter}</span>
          </span>
        ) : (
          <span key={`${letter}-${index}`}>{letter}</span>
        );
      })}
      {offset === -1 && (
        <span className="relative py-1 leading-none">
          <span className="terminal-cursor absolute inset-0 bg-current"></span>
          <span className="invisible">M</span>
        </span>
      )}
    </Heading.h1>
  );
}
