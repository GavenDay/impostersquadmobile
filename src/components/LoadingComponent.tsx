import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingComponent() {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col p-4 sm:p-6 md:p-8">
      <header className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-10" />
      </header>

      <Card className="w-full border-2 border-primary/20 bg-card/80 shadow-xl shadow-primary/5">
        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-12 w-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-72" />
              <div className="grid grid-cols-1 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            <div className="flex justify-center">
              <Skeleton className="h-20 w-full max-w-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
