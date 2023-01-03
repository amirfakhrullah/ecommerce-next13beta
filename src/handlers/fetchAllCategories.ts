import db from "../lib/servers/prismadb";

export const fetchAllCategories = () => db.category.findMany();
