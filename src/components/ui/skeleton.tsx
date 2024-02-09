import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("dark:bg-dark-tremor-background-subtle bg-tremor-background-subtle animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }