import "./Profile.css";
import {CreateRecipeBookForm} from "./CreateRecipeBookForm.tsx";

export function Profile() {

    return (<>
            <div className="container">
                <div className="profile-header">
                    <img src="//image/users/1.jpg" alt="Avatar" className="avatar"/>
                    <div className="user-info">
                        <h1>Mattia</h1>
                        <p className="user-meta">
                            {"{"}description{"}"}
                        </p>
                    </div>
                </div>
                <div className="cookbooks-nav">
                    <div className="cookbook-tab active">
                        Le mie ricette <span className="count">1</span>
                    </div>
                    <div className="cookbook-tab ">
                        Preferiti <span className="count">0</span>
                    </div>
                    <div className="add-cookbook">
                        <i className="fas fa-plus"/> Nuovo
                    </div>
                </div>
                <div className="cookbook-content">
                    <div className="cookbook-header">
                        <h2>Le mie ricette</h2>
                        {/*div class="cookbook-actions">
    <button class="btn btn-outline">
      <i class="fas fa-sort"></i> Ordina
    </button>
    <button class="btn btn-outline">
      <i class="fas fa-filter"></i> Filtra
    </button>
  </div*/}
                    </div>
                    <div className="recipes-grid">
                        <a href="recipe-details.html">
                            <div className="recipe-card">
                                <img
                                    src="//image/recipes/1.png"
                                    alt="Spaghetti with tomato sauce"
                                    className="recipe-image"
                                />
                                <div className="recipe-info">
                                    <h3 className="recipe-title">Spaghetti with tomato sauce</h3>
                                    <div className="recipe-meta">
                <span>
                  <i className="fas fa-trash"/>
                </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <CreateRecipeBookForm/>
        </>
    );
}