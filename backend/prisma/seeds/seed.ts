import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Sports", subcategories: ["Walking", "Workout", "Soccer", "Yoga"] },
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

  for (const categoryData of categories) {
    const category = await prisma.category.create({
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
}

void main();
