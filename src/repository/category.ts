import { Category } from '../models/Category';


async function listCategories() {

  return await Category.find();

}

async function listCategory(name: string) {
  return await Category.findOne({ name });
}

async function createCategory(name: string) {

  return await Category.create({ name });

}

async function updateCategory(

) {
  const res = await Category.updateOne(
    {},
    {}
  );
  return res;
}

async function deleteCategory(id: string) {
  return await Category.deleteOne({ id });
}

export { listCategories, createCategory, updateCategory, deleteCategory, listCategory };
