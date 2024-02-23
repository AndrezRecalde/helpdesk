import { LinksGroup } from "./NavbarLinksGroup";
import {
    lGerente,
    lTecnico,
} from "./navlinks/navLinks";
import classes from "../../../assets/styles/modules/layout/navbar/AppNavbar.module.css";

export const AppNavbar = ({ role }) => {
    const mockdata =
        role === "GERENTE" ? lGerente : role === "TECNICO" ? lTecnico : [];

    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.linksInner}>{links}</div>
            {/* <AppNavfooter /> */}
        </nav>
    );
};
