import categoryM from "../models/category.m.js";
import productM from "../models/product.m.js";

export default {
    getAllProductsOfCategory: async (req, res) => {
        try {
            const catId = Number(req.params.id);
            const categories = await categoryM.all();
            const selectedCategory = categories.find(c => c.id === catId);
            if (selectedCategory) {
                selectedCategory.current = true;
            } else {
                return res.status(404).render("404", { message: "Category not found" });
            }
            const products = await productM.allOfCategory(catId);
            res.render("product/products", { products, categories });
        } catch (err) {
            res.status(500).render("500", { message: "Internal Server Error" });
        }
    },
    getCategories: async (req, res) => {
        try {
            const categories = await categoryM.all();
            res.render('cat', { categories });
        } catch (err) {
            res.status(500).render("500", { message: "Internal Server Error" });
        }
    },
    postCategory: async (req, res) => {
        try {
            const newCategory = { title: req.body.title };
            await categoryM.create(newCategory);
            res.redirect("/categories");
        } catch (err) {
            res.status(500).render("500", { message: "Internal Server Error" });
        }
    },
    putCategory: async (req, res) => {
        try {
            const catId = Number(req.body.id);
            const updatedCategory = { title: req.body.title };
            await categoryM.update(catId, updatedCategory);
            res.redirect('/categories');
        } catch (err) {
            res.status(500).render("500", { message: "Internal Server Error" });
        }
    },
    getSelectCategory: async (req, res) => {
        try {
            const catId = Number(req.params.id);
            const categories = await categoryM.all();
            const selectedCategory = categories.find(c => c.id === catId);

            if (selectedCategory) {
                selectedCategory.current = true;
            } else {
                return res.status(404).render("404", { message: "Category not found" });
            }

            res.render('cat', { categories, selectedCategory });
        } catch (err) {
            res.status(500).render("500", { message: "Internal Server Error" });
        }
    }
};
