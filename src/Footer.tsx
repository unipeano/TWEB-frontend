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
    </footer>);
}