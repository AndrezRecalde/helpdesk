import { LinksGroup } from "./NavbarLinksGroup";
import { navRoutes } from "../../../routes/router/routes3";
import classes from "../../../assets/styles/modules/layout/navbar/AppNavbar.module.css";

export const AppNavbar = ({ role, toggleMobile }) => {
    // Filtra las secciones y enlaces en función del rol del usuario
    const filteredLinks = navRoutes
        .filter((section) => section.roles.includes(role))
        .map((section) => ({
            ...section,
            links: section.links.filter((link) => link.roles.includes(role))
        }));

    const links = filteredLinks.map((item) => (
        <LinksGroup {...item} key={item.label} role={role} toggleMobile={toggleMobile} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.linksInner}>{links}</div>
            {/* <AppNavfooter /> */}
        </nav>
    );
};
