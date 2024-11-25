import GetQuoteClient from "@/components/get-quote-client";
import { Skeleton } from "@/components/ui/skeleton";
import { getClient } from "@/lib/apollo-client";
import { GET_QUOTE } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, loading, error } = await getClient().query({
    query: GET_QUOTE,
  });

  return (
    <main className="flex  min-h-screen space-y-12 flex-col items-center p-24">
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl">Server Side Example</h1>
        <div>
          {data?.randomQuote?.quote ? (
            <div>
              Quote: {data?.randomQuote?.quote} By: {data?.randomQuote?.author}
            </div>
          ) : (
            <Skeleton className="h-8 w-48" />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        {" "}
        <h1 className="text-3xl">Client Side</h1>
        <GetQuoteClient />
      </div>
    </main>
  );
}
