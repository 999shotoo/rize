import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <>
      <div className="container p-6 mx-auto">
        <div className="space-y-4 my-4">
          <Skeleton className="h-8 w-[300px]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: 18 }).map((_, index) => (
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
