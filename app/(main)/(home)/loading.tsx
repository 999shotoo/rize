import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <div className="container p-6 mx-auto">
        <div className="hidden md:block">
          <div className="space-y-4 my-4">
            <Skeleton className="h-8 w-[300px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg flex items-center space-x-4"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-[150px]" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 my-4">
          <Skeleton className="h-8 w-[300px]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-card p-4 rounded-lg">
              <Skeleton className="h-[15vh] rounded-3xl" />
              <div className="space-y-4 my-4">
                <Skeleton className="h-6 w-[100px] md:w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
