type Position = "A" | "B" | "C" | "D";

export type BoardGame = {
  id: number;
  name: {
    english: string;
    chinese: string;
  };
  type: string;
  position: Position | undefined;
  inventory: boolean;
  status: {
    shrinkWrap: string;
    appearance: string;
    missingParts: string;
    sleeves: string;
  };
  note: string | undefined;
  borrowed: boolean;
  borrower: string | undefined;
  recommendedCounts: number;
};

export type BoardGameResponse = {
  total: number;
  data: BoardGame[];
};
