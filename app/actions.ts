"use server";

import { getClient } from "@/lib/apollo-client";
import { GET_QUOTE } from "@/lib/queries";

export const fetchQuoteAction = async () => {
  const { data, error } = await getClient().query({
    query: GET_QUOTE,
  });
  return { data, error };
};
