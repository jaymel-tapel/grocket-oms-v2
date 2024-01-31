import { Client } from "./clientsQueries";

export type Company = {
  id: number;
  clientId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  url: string;
  valid_url: boolean;
  check_url: boolean;
  latest_check: boolean;
  client: Client;
};
