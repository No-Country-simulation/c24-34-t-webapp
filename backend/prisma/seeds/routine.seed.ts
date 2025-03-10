/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { type Period } from "@/src/common/types/types";

import routines from "./routines-mock-data.json";
import users from "./users-mock-data.json";

const prisma = new PrismaClient();

async function createRoutine({
  routine,
  userId,
}: {
  routine: (typeof routines)[0];
  userId: string;
}) {
  await Promise.all(
    routine.activities.map(async (activity, index: number) => {
      const category = await prisma.category.findFirst({
        where: { name: activity.category },
        select: { name: true, subcategories: true },
      });

      if (!category) {
        throw new Error(`activities.${index}.category not found`);
      }

      const subcategory = category.subcategories.find(
        sub => sub.name === activity.subcategory,
      );

      if (!subcategory) {
        throw new Error(
          `activities.${index}.subcategory not found in this category`,
        );
      }

      const unit = await prisma.unit.findFirst({
        where: { name: activity.goal.unit },
      });

      if (!unit) {
        throw new Error(`activities.${index}.unit not found`);
      }
    }),
  );

  const newRoutine = await prisma.routine.create({
    data: {
      title: routine.title,
      description: routine.description,
      userId: userId,
      activities: {
        create: routine.activities.map(activity => ({
          title: activity.title,
          description: activity.description,
          time: activity.time,
          subcategory: {
            connect: { name: activity.subcategory },
          },
          goals: {
            create: {
              unit: {
                connect: { name: activity.goal.unit },
              },
              period: activity.goal.period as Period,
              value: activity.goal.value,
            },
          },
        })),
      },
    },
    select: {
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
              unit: { select: { name: true } },
              period: true,
              value: true,
            },
          },
          subcategory: {
            select: {
              id: true,
              name: true,
              category: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return {
    id: newRoutine.id,
    title: newRoutine.title,
    description: newRoutine.description,
    userId: newRoutine.userId,
    activities: newRoutine.activities.map(activity => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      time: activity.time,
      category: activity.subcategory.category.name,
      subcategory: activity.subcategory.name,
      goal:
        activity.goals.length > 0
          ? {
              id: activity.goals[0].id,
              unit: activity.goals[0].unit.name,
              period: activity.goals[0].period,
              value: activity.goals[0].value,
            }
          : undefined,
    })),
  };
}

async function main() {
  const newUsers: string[] = [];
  for (const user of users) {
    try {
      user.password = await hash(user.password);
      const newUser = await prisma.user.create({ data: user });
      newUsers.push(newUser.id);
      console.log("Created user:", newUser.username);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  for (const [index, routine] of routines.entries()) {
    try {
      const userId = newUsers[index % newUsers.length];
      const newRoutine = await createRoutine({ routine, userId });
      console.log("Created routine:", newRoutine);
    } catch (error) {
      console.error("Error creating routine:", error);
    }
  }
}

async function hash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

void main();
