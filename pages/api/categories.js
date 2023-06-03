import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

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
