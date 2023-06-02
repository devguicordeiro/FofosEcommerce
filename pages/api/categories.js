import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;

    try {
      let parent = null;
      if (parentCategory !== "") {
        parent = parentCategory;
      }

      const categoryDoc = await Category.create({
        name,
        parent,
        properties,

      });
      res.json(categoryDoc);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: "Invalid parent category ID" });
    }
  }

  if (method === "PUT") {
        const { name, parentCategory, _id, properties } = req.body;

    try {
      let parent = null;
      if (parentCategory !== "") {
        parent = parentCategory;
      }

      const categoryDoc = await Category.updateOne({_id}, {
        name,
        parent,
        properties,
      });
      res.json(categoryDoc);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: "Invalid parent category ID" });
    }
  }

  if (method === "DELETE") {
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json("ok");
  }
}
