import {type ReactElement,} from "react";
import "./Footer.css"

export function Footer(): ReactElement {

    return (<footer><p className="copy">
        <span className="highlight">Cooknnect</span> è un progetto no profit realizzato per il corso di Tecnologie Web,
        CdL in Informatica,
        Università di Torino.
    </p>
        <p className="license">&copy; 2024-2025 Mattia Peano.<a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"><img alt="creative commons license"
                                                                                  className="cclicense"
                                                                                  src="/image/by-nc-sa.png"/></a>
        </p>
        <p className="credits"><a href="https://www.flaticon.com/free-icons/"
                                  title="down arrow icons">Icons created by Flaticon</a></p>
    </footer>);
}