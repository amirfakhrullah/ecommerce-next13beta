import db from "../../lib/prismadb";

export const fetchAllCategories = () => db.category.findMany();
