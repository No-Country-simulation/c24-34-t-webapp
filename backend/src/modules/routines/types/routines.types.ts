import { Period, TimeRange } from "@/src/common/types/types";

type Routine = {
  id: string;
  title: string;
  description: string;
  activities: {
    id: string;
    title: string;
    description: string;
    timeRange: TimeRange;
    time: string;
    subcategory: {
      id: string;
      name: string;
      category: {
        id: string;
        name: string;
      };
    };
    goals: {
      id: string;
      unit: {
        id: string;
        name: string;
      };
      period: Period;
      value: number;
    }[];
  }[];
};

export { Routine };
