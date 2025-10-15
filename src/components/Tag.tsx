export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="border-color-background-inverse rounded-xs border px-1 font-mono text-sm font-medium">
      {children}
    </span>
  );
};
