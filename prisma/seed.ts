import { prisma } from "./orm";

const main = async () => {
  const categories = await prisma.category.createMany({
    data: [
      { id: "1", name: "new_food" },
      { id: "2", name: "popular" },
      { id: "3", name: "recomended" },
    ],
  });
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { id: "1", name: "Seledri" },
      { id: "2", name: "Telur" },
      { id: "3", name: "Blueberry" },
      { id: "4", name: "Madu" },
      { id: "5", name: "Daging Sapi" },
      { id: "6", name: "Bawang Putih" },
      { id: "7", name: "Sawi" },
    ],
  });
  const foods = await prisma.food.createMany({
    data: [
      {
        name: "Sushi",
        description:
          "Makanan khas Bandung yang cukup sering dipesan oleh anak muda dengan pola makan yang cukup tinggi dengan mengutamakan diet yang sehat dan teratur.",
        price: 15000,
        rating: 3,
        image:
          "https://foodmarket-backend.buildwithangga.id/storage/assets/food/yL6Igz8JjWEllcqYYIJ0Arqi7Jfe2agaXe33g40Y.jpeg",
      },
      {
        name: "Baso Malang",
        description: "Mantap Roso",
        price: 10000,
        rating: 4,
        image:
          "https://foodmarket-backend.buildwithangga.id/storage/assets/food/4jjxgHdPKx8Xdx15iQRLnZ6yg1J9dNVdTXVxPl5m.jpeg",
      },
      {
        name: "Spageti",
        description:
          "Makanan khas Bandung yang cukup sering dipesan oleh anak muda dengan pola makan yang cukup tinggi dengan mengutamakan diet yang sehat dan teratur.",
        price: 50000,
        rating: 5,
        image:
          "https://foodmarket-backend.buildwithangga.id/storage/assets/food/sYrOblD3NXmQ1QefXraOeSW14runwHWQuLlRODaW.jpeg",
      },
      {
        name: "Pizza",
        description:
          "Makanan khas Bandung yang cukup sering dipesan oleh anak muda dengan pola makan yang cukup tinggi dengan mengutamakan diet yang sehat dan teratur.",
        price: 100000,
        rating: 4,
        image:
          "https://foodmarket-backend.buildwithangga.id/storage/assets/food/obI7CfhHdsZOR0ynQy2YT248Glkszw3Bq4NSi6WM.jpeg",
      },
    ],
  });
  const resultFoods = await prisma.food.findMany();
  const categoriesOnFoods = await prisma.categoriesOnFoods.createMany({
    data: [
      { food_id: resultFoods[0].id, category_id: "1" },
      { food_id: resultFoods[0].id, category_id: "2" },
      { food_id: resultFoods[1].id, category_id: "2" },
      { food_id: resultFoods[1].id, category_id: "3" },
      { food_id: resultFoods[2].id, category_id: "1" },
      { food_id: resultFoods[2].id, category_id: "2" },
      { food_id: resultFoods[2].id, category_id: "3" },
      { food_id: resultFoods[3].id, category_id: "2" },
      { food_id: resultFoods[3].id, category_id: "3" },
    ],
  });
  const ingredientsOnFoods = await prisma.ingredientsOnFoods.createMany({
    data: [
      { food_id: resultFoods[0].id, ingredient_id: "1" },
      { food_id: resultFoods[0].id, ingredient_id: "2" },
      { food_id: resultFoods[0].id, ingredient_id: "3" },
      { food_id: resultFoods[0].id, ingredient_id: "4" },
      { food_id: resultFoods[1].id, ingredient_id: "5" },
      { food_id: resultFoods[1].id, ingredient_id: "6" },
      { food_id: resultFoods[1].id, ingredient_id: "7" },
      { food_id: resultFoods[2].id, ingredient_id: "1" },
      { food_id: resultFoods[2].id, ingredient_id: "2" },
      { food_id: resultFoods[2].id, ingredient_id: "3" },
      { food_id: resultFoods[2].id, ingredient_id: "4" },
      { food_id: resultFoods[3].id, ingredient_id: "1" },
      { food_id: resultFoods[3].id, ingredient_id: "2" },
      { food_id: resultFoods[3].id, ingredient_id: "3" },
      { food_id: resultFoods[3].id, ingredient_id: "4" },
    ],
  });
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
