import "./Profile.css";
import {CreateRecipeBookForm} from "./CreateRecipeBookForm.tsx";
import {useContext} from "react";
import {UserContext} from "./App.tsx";

export function Profile() {
    const user = useContext(UserContext);
    return (<>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="/image/users/1.jpg" alt="Avatar" className="avatar"/>
                    <div className="user-info">
                        <h1>{user}</h1>
                        <p className="user-meta">
                            {"{"}description{"}"}
                        </p>
                    </div>
                </div>
                <div className="recipebooks-nav">
                    <div className="recipebook-tab active">
                        Le mie ricette <span className="count">1</span>
                    </div>
                    <div className="recipebook-tab ">
                        Preferiti <span className="count">0</span>
                    </div>
                    <div className="add-recipebook">
                        <img className="icons" alt="add"
                             src="/add.png"/>
                        Nuovo
                    </div>
                </div>
                <div className="recipebook-content">
                    <div className="recipebook-header">
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
                                    src="/image/recipes/1.png"
                                    alt="Spaghetti with tomato sauce"
                                    className="recipe-image"
                                />
                                <div className="recipe-info">
                                    <h3 className="recipebook-recipe-title">Spaghetti with tomato sauce</h3>
                                    <div className="recipebook-recipe-meta">
                <span>
                  <img className="icons" alt="bin"
                       src="/bin.png"/>
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