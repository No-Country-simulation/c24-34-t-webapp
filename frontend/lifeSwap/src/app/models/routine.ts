export interface Routine {
  id: string;
  title: string;
  description: string;
  activities: Activity[];
}

//Omit allows using the same interface routine without the id attributed
export interface CreateRoutineDTO extends Omit<Routine, 'id' | 'activities'> {
  activities: CreateActivityDTO[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  timeRange: string;
  category: string;
  subcategory: string;
  goal: Goal;
}
//Omit allows using the same interface Activity without the id attributed
export interface CreateActivityDTO extends Omit<Activity, 'id' | 'goal'> {
  goal: CreateGoalDTO;
}

export interface Goal {
  id: string;
  unit: string;
  period: string;
  value: number;
}
//Omit allows using the same interface Goal without the id attributed
export interface CreateGoalDTO extends Omit<Goal, 'id'> {}
