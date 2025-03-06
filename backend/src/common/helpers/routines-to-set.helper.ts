import { type FindAllRoutinesDto } from "@/src/modules/routines/dto/find-all.dto";

const routinesToSet = (
  routines: FindAllRoutinesDto[],
): FindAllRoutinesDto[] => {
  const uniqueRoutines = new Map<string, FindAllRoutinesDto>();

  for (const routine of routines) {
    uniqueRoutines.set(routine.id, routine);
  }

  return [...uniqueRoutines.values()];
};

export { routinesToSet };
