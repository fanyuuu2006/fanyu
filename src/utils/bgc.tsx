import { BoardGame, BoardGameResponse } from "@/types/bgc";
import { fetcher } from ".";

const assets = () =>
  fetcher<BoardGameResponse>(
    "https://ntust-board-game-club-bot.vercel.app/assets",
    {
      cache: "no-store",
    }
  );

const stringify = (game: BoardGame): string => {
  return `
      ${game.id}
      ${game.name.english}
      ${game.name.chinese}
      ${game.type}
      ${game.position}
      ${game.inventory ? "已清點" : "未清點"}
      ${Object.values(game.status).join(" ")}
      ${game.note ?? ""}
      ${game.borrowed ? "已借出" : "未借出"}
      ${game.recommendedCounts}
    `;
};

const bgc = {
  assets,
  stringify,
};

export default bgc;
