import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async tx => {
      const categories = [
        {
          name: "Sports",
          subcategories: ["Walking", "Workout", "Soccer", "Yoga"],
        },
        {
          name: "Health",
          subcategories: ["Skin Care", "Meditation", "Nutrition", "Hydration"],
        },
        {
          name: "Home",
          subcategories: ["Cooking", "Cleaning", "Laundry", "Decoration"],
        },
        {
          name: "Hobbies",
          subcategories: ["Reading", "Video Games", "Painting", "Singing"],
        },
      ];

      const units = ["minute", "hour", "time", "liter"];

      for (const categoryData of categories) {
        const category = await tx.category.create({
          data: {
            name: categoryData.name,
            subcategories: {
              create: categoryData.subcategories.map(subcat => ({
                name: subcat,
              })),
            },
          },
        });

        console.log(`Created category: ${category.name}`);
      }

      for (const unitData of units) {
        const unit = await tx.unit.create({
          data: {
            name: unitData,
          },
        });

        console.log(`Created unit: ${unit.name}`);
      }
    });

    console.log("Database seeding completed successfully.");
  } catch (error) {
    throw new Error(`Database seeding failed: ${(error as Error).message}`);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
