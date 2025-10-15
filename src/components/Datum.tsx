const Datum = ({ children }: { children: React.ReactNode }) => {
  return <span className="flex items-center gap-2">{children}</span>;
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <span className="min-w-[4ch] font-[var(--font-stack)] text-muted">{children}</span>;
};

const Value = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-mono font-medium">{children}</span>;
};

export { Datum, Label, Value };
