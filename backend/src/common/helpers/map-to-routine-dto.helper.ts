import { type FindAllRoutinesDto } from "@/src/modules/routines/dto/dto";
import { type Routine } from "@/src/modules/routines/types/types";

const mapToRoutineDto = (routine: Routine): FindAllRoutinesDto => {
  const activitiesDto = routine.activities.map(activity => {
    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      time: activity.time,
      category: activity.subcategory.category.name,
      subcategory: activity.subcategory.name,
      goal: {
        id: activity.goals[0]?.id,
        unit: activity.goals[0]?.unit.name,
        period: activity.goals[0]?.period,
        value: activity.goals[0]?.value,
      },
    };
  });

  return {
    id: routine.id,
    title: routine.title,
    description: routine.description,
    userId: routine.userId,
    activities: activitiesDto,
  };
};

export { mapToRoutineDto };
