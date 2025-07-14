import type {ReactElement} from "react";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";
import "./Home.css";

export function Home(): ReactElement {

    return (<>
        <div className="recipe-container">
            <div className="recipe-container-header">
                <div className="recipe-container-header-title">
                    <h1>Ricette</h1>
                </div>
                <form className="status-filter">
                    <div className="status-filter-title">
                        Filtra:
                    </div>
                    <div className="status-filter-item">
                        <input type="radio"
                               name="status-filter-radio"
                               value="all"
                               id="all" checked/><label htmlFor="all">All recipes</label>
                    </div>
                    <div className="status-filter-item">
                        <input type="radio"
                               name="status-filter-radio"
                               value="breakfast"
                               id="breakfast"/><label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="status-filter-item">
                        <input type="radio"
                               name="status-filter-radio"
                               value="appetizer"
                               id="appetizer"/><label htmlFor="appetizer">Appetizer</label>
                    </div>
                    <div className="status-filter-item">
                        <input type="radio"
                               name="status-filter-radio"
                               value="main-course"
                               id="main-course"/><label htmlFor="main-course">Main Course</label>
                    </div>
                    <div className="status-filter-item">
                        <input type="radio"
                               name="status-filter-radio"
                               value="dessert"
                               id="dessert"/><label htmlFor="dessert">Dessert</label>
                    </div>
                </form>
            </div>
            <div className="recipe-container-content">
                <div className="recipe-collection">
                    <div className="recipe-item" data-recipeid="1">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/1.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Spaghetti with tomato sauce</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Main Course</span>
                            </div>
                            <p className="recipe-description">A classic Italian pasta dish with tomato sauce</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 10 min</span>
                                    <span>🍽️ 4 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Mattia</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-item" data-recipeid="2">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/2.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Chocolate cake</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Dessert</span>
                            </div>
                            <p className="recipe-description">Rich dark chocolate cake</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 45 min</span>
                                    <span>🍽️ 8 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Pietro</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-item" data-recipeid="3">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/3.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Caesar salad</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Appetizer</span>
                            </div>
                            <p className="recipe-description">Fresh salad with chicken and dressing</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 20 min</span>
                                    <span>🍽️ 2 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Andrea</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="recipe-item" data-recipeid="4">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/4.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Pancakes</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Breakfast</span>
                                <span className="recipe-category">Dessert</span>
                            </div>
                            <p className="recipe-description">Fluffy morning pancakes</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 25 min</span>
                                    <span>🍽️ 3 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Antonio</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-item" data-recipeid="5">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/5.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Omelette</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Breakfast</span>
                            </div>
                            <p className="recipe-description">Quick and easy egg dish</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 10 min</span>
                                    <span>🍽️ 1 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Paola</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-item" data-recipeid="6">
                        <img className="recipe-image"
                             alt="recipe image"
                             src="/image/recipes/6.png"/>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">BLT Sandiwich</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Main Course</span>
                                <span className="recipe-category">Appetizer</span>
                            </div>
                            <p className="recipe-description">Bacon, Lettuce, Tomato sandwich</p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 10 min</span>
                                    <span>🍽️ 1 pers.</span>
                                    <span className="recipe-author">👨‍🍳 <a href="user-recipe.html">Elena</a></span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recipe-sidebar"></div>
            </div>
        </div>


        <AddToRecipeBookModal/>
    </>);

}