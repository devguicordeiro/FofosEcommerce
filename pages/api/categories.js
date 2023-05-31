import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find());
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;

    try {
      let parent = null;
      if (parentCategory !== "") {
        parent = parentCategory;
      }

      const categoryDoc = await Category.create({
        name,
        parent,
      });
      res.json(categoryDoc);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: "Invalid parent category ID" });
    }
  }
}
