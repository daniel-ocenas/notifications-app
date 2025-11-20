"use client";

import { apolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
import { PropsWithChildren } from "react";

export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
