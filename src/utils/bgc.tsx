import { BoardGameResponse } from "@/types/bgc";
import { fetcher } from ".";

export const assets = () =>
  fetcher<BoardGameResponse>(
    "https://ntust-board-game-club-bot.vercel.app/assets",
    {
      cache: "no-store",
    }
  );
