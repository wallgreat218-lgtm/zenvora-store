export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-md bg-foreground/10" />
          <div className="h-4 w-72 rounded-md bg-foreground/10" />
        </div>
        <div className="h-10 w-36 rounded-md bg-foreground/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <div className="absolute inset-0 bg-foreground/10" />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <div className="h-6 w-20 rounded-full bg-foreground/10" />
                <div className="h-6 w-16 rounded-full bg-foreground/10" />
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background/40 p-2 backdrop-blur">
                  <div className="h-9 flex-1 rounded-md bg-foreground/10" />
                  <div className="h-9 w-11 rounded-md bg-foreground/10" />
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-5 w-44 rounded-md bg-foreground/10" />
                  <div className="h-5 w-36 rounded-md bg-foreground/10" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-5 w-16 rounded-md bg-foreground/10" />
                  <div className="h-4 w-20 rounded-md bg-foreground/10" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 rounded-md bg-foreground/10" />
                <div className="h-4 w-20 rounded-md bg-foreground/10" />
              </div>
              <div className="h-4 w-64 rounded-md bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
