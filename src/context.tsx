import { createContext } from "react";
import { HyperspaceClient, SortOrderEnum } from "hyperspace-client-js";

// API client for accessing Hyperspace data
const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
);

export const AppContext = createContext({
  hyperClient,
//   setUserAddress: (address: string) => {
//     this.userAddress = address;
//   },
});