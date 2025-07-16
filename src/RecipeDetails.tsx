import "./RecipeDetails.css";

export function RecipeDetails() {
    return (<div className="recipe-details-container">
            <div className="recipe-details-header">
                <img
                    src="/image/recipes/1.png"
                    alt="Pasta al pesto"
                    className="recipe-details-image"
                />
                <h1 className="recipe-details-title">
                    {"{"}title{"}"}
                </h1>
            </div>
            <div className="recipe-details-meta">
                <div className="meta-details-item">
                    <span className="meta-icon">⏱️</span>
                    <span>
        {"{"}time{"}"} minuti
      </span>
                </div>
                <div className="meta-details-item">
                    <span className="meta-icon">🍽️</span>
                    <span>
        {"{"}servings{"}"} persone
      </span>
                </div>
                <div className="meta-details-item add">
                    <button className="add-to-recipebook">+</button>
                </div>
            </div>
            <div className="recipe-details-content">
                <div className="main-content">
                    <div className="description-section">
                        <p>
                            {"{"}description{"}"}
                        </p>
                    </div>
                    <div className="ingredients-section">
                        <h2>Ingredienti</h2>
                        <ul className="ingredients-list">
                            <li>
            <span>
              {"{"}ingredient{"}"}
            </span>{" "}
                                <span>
              {"{"}quantity{"}"}
            </span>
                            </li>
                        </ul>
                    </div>
                    <div className="instructions-section">
                        <h2>Preparazione</h2>
                        <ol className="instructions-list">
                            <li>
                                {"{"}instruction{"}"}
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="author-section">
                        <img src="/image/users/1.jpg" alt="Autore" className="author-avatar"/>
                        <h3>
                            {"{"}author{"}"}
                        </h3>
                        <p>
                            {"{"}who's{"}"}
                        </p>
                        <div className="action-buttons">
                            <a href="user-recipe.html" className="btn btn-primary">
                                Altre ricette
                            </a>
                            <a href="#" className="btn btn-secondary">
                                Segui
                            </a>
                        </div>
                    </div>
                    <div className="tags-section">
                        <h2>Categorie</h2>
                        <div className="recipe-tags">
          <span className="tag">
            {"{"}category{"}"}
          </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}