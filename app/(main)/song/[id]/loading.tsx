import { Skeleton } from "@/components/ui/skeleton";

export default function SongsLoading() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:mb-6">
        <Skeleton className="h-72 w-72 rounded-lg" />
        <div className="text-center md:text-left">
          <Skeleton className="h-10 w-48 mb-2" />
          <div className="grid grid-cols-1 gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
      <div className="mb-8 hidden md:block">
        <Skeleton className="h-12 w-24 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:cursor-pointer py-2 px-4 rounded-lg"
            >
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-4" />
                <div className="grid grid-cols-1 gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
      </div>
    </div>
  );
}
