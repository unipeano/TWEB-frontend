export interface Category {
    id: number;
    name: string;
}

export interface Ingredient {
    id: number;
    name: string;
    quantity?: string;
}

export interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    instructions: string;
    preparationTime: number;
    servings: number;
    author: string;
    ingredients: Ingredient[];
    categories: Category[];
}

export interface User {
    username: string;
    role: string;
    description: string | null;
    image: string | null;
}

export interface RecipeBook {
    id: number;
    name: string;
    recipeBookOwner: string;
    recipes: number[]; // Array of recipe IDs
}

