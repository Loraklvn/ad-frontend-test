import { Game } from "@/utils/endpoint";
import { AxiosError } from "axios";
import apiClient from "../apiClient";

type GetGamesParams = {
  genre?: string;
  page?: number;
};

export type GetGamesResponse = {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
};

export async function getGames(
  params?: GetGamesParams
): Promise<GetGamesResponse> {
  try {
    const { data } = await apiClient.get<GetGamesResponse>("/games", {
      params,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch games");
    }
    throw error;
  }
}
