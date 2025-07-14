import "./UserRecipes.css";

export function UserRecipes() {
    return (<div className="recipe-container">
            <div className="recipe-container-header">
                <div className="user-image-container">
                    <img src="/image/users/1.jpg" alt="user image" className="user-image"/>
                </div>
                <div className="user-info-container">
                    <h1 className="recipe-container-header-title">Mattia</h1>
                    <p>
                        {"{"}description{"}"}
                    </p>
                </div>
            </div>
            <div className="recipe-container-content">
                <div className="recipe-collection">
                    <div className="recipe-item" data-recipeid={1}>
                        <img
                            className="recipe-image"
                            alt="recipe image"
                            src="/image/recipes/1.png"
                        />
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3 className="recipe-title">Spaghetti with tomato sauce</h3>
                                <button className="add-to-recipebook">+</button>
                            </div>
                            <div className="recipe-categories">
                                <span className="recipe-category">Main Course</span>
                            </div>
                            <p className="recipe-description">
                                A classic Italian pasta dish with tomato sauce
                            </p>
                            <div className="recipe-meta">
                                <div className="recipe-details">
                                    <span>⏱️ 10 min</span>
                                    <span>🍽️ 4 persone</span>
                                    <span className="recipe-author">
                👨‍🍳{" "}
                                        <a href="user-recipe.html">
                  {"{"}author{"}"}
                </a>
              </span>
                                </div>
                                <a href="recipe-details.html">
                                    <button className="recipe-action">Vedi ricetta</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recipe-sidebar"/>
            </div>
        </div>
    );
}