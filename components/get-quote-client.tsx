"use client";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { GET_QUOTE } from "@/lib/queries";
import { useLazyQuery, useSuspenseQuery } from "@apollo/client";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface GetQuoteClientProps {}

const GetQuoteClient: FC<GetQuoteClientProps> = ({}) => {
  const [quote, setQuote] = useState<string>("");
  const [randomQuote, { loading, error, data }] = useLazyQuery(GET_QUOTE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log("Quote data", data);
      setQuote(data.randomQuote.quote);
    },
  });
  const handleQuoteClick = async () => {
    console.log("Getting quote button clicked");
    randomQuote();
  };

  console.log(data);

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <div
              onClick={handleQuoteClick}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Get Client (client-side)
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Random Quote</DialogTitle>
              <DialogDescription>
                A quote should be shown below and click on the Button below to
                generate a new quote
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className=" items-center gap-4">
                Quote: {quote || <Skeleton className="w-[200px] h-8" />}
              </div>
              <div>{error && <div>Error: {error.message}</div>}</div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleQuoteClick}
                disabled={loading || !data}
              >
                Regenerate Quote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default GetQuoteClient;
