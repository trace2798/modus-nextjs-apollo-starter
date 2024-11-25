"use client";
import { fetchQuoteAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";

interface GetQuoteClientProps {}

const GetQuoteClient: FC<GetQuoteClientProps> = ({}) => {
  const [quote, setQuote] = useState<string>("");
  const [error, setError] = useState<string>("");
  // const [randomQuote, { loading, error, data }] = useLazyQuery(GET_QUOTE, {
  //   fetchPolicy: "no-cache",
  //   onCompleted: (data) => {
  //     console.log("Quote data", data);
  //     setQuote(data.randomQuote.quote);
  //   },
  // });
  const randomQuote = async () => {
    const { data, error } = await fetchQuoteAction();
    console.log("DATA ACTION", data);
    if (error) {
      setError(error.message);
    }
    setQuote(data?.randomQuote.quote);
  };
  const handleQuoteClick = async () => {
    console.log("Getting quote button clicked");
    randomQuote();
  };
  // console.log("DATA", data);

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
              <div>{error && <div>Error: {error}</div>}</div>
            </div>
            <DialogFooter>
              {quote && (
                <Button
                  type="submit"
                  onClick={handleQuoteClick}
                  // disabled={}
                >
                  Regenerate Quote
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default GetQuoteClient;
