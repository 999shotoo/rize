import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ArtistsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <Skeleton className="w-[200px] h-[200px] rounded-full" />
        <div className="text-center md:text-left flex-grow w-full">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-64 mb-4" />
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="popular-songs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="popular-songs" disabled>
            Popular Songs
          </TabsTrigger>
          <TabsTrigger value="popular-albums" disabled>
            Popular Albums
          </TabsTrigger>
          <TabsTrigger value="latest-albums" disabled>
            Latest Albums
          </TabsTrigger>
          <TabsTrigger value="singles" disabled>
            Singles
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular-songs">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="popular-albums">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="w-[250px] flex-shrink-0">
                <CardContent className="p-4">
                  <Skeleton className="w-[200px] h-[200px] rounded-md mb-2" />
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
