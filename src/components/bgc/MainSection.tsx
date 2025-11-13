import { BoardGameResponse } from "@/types/bgc";

export type MainSectionProps = {
  data: BoardGameResponse;
};
export const MainSection = ({ data }: MainSectionProps) => {
  return <section>{JSON.stringify(data)}</section>;
};
