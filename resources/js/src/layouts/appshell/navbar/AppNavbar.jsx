import { LinksGroup } from "./NavbarLinksGroup";
import {
    Roles,
    lGerente,
    lTecnico,
    lUsuario,
} from "./navlinks/navLinks";
import classes from "../../../assets/styles/modules/layout/navbar/AppNavbar.module.css";

export const AppNavbar = ({ role, toggleMobile }) => {
    const mockdata =
        role === Roles.GERENTE ? lGerente : role === Roles.TECNICO ? lTecnico : role === Roles.USUARIO ? lUsuario : [];

    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} toggleMobile={toggleMobile} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.linksInner}>{links}</div>
            {/* <AppNavfooter /> */}
        </nav>
    );
};
