const ROUTINE_SELECT = {
  id: true,
  title: true,
  description: true,
  userId: true,
  activities: {
    select: {
      id: true,
      title: true,
      description: true,
      time: true,
      goals: {
        select: {
          id: true,
          unit: true,
          period: true,
          value: true,
        },
      },
      subcategory: {
        select: {
          id: true,
          name: true,
          category: true,
        },
      },
    },
  },
};

export { ROUTINE_SELECT };
