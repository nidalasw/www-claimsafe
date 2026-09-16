import { IconCheck } from "./icons";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="mask-fade-x overflow-hidden border-y border-border bg-background py-7">
      <div className="animate-marquee flex w-max gap-14">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-secondary"
          >
            <IconCheck className="h-4.5 w-4.5 shrink-0 text-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
