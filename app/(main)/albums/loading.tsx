import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAlbums() {
  return (
    <>
      <div className="container p-6 mx-auto">
        <div className="">
          <Card className="w-full overflow-hidden mb-6">
            <CardContent className="p-0">
              <div className="relative aspect-[21/9] md:aspect-[21/7]">
                <Skeleton className="object-cover w-full h-[50vh]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2 md:p-6">
                  <Skeleton className="h-4 w-[100px] mb-1" />
                  <Skeleton className="h-6 w-[200px] mb-2" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-10 w-[80px]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
