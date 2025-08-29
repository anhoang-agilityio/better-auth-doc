type TocItem = {
  id: string;
  text: string;
  level: number;
  children: TocItem[];
};

export type { TocItem };
