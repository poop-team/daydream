export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-300 dark:bg-slate-700 ${className}`}
    />
  );
}
