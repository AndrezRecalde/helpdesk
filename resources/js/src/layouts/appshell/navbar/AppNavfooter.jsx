import { IconLogout } from "@tabler/icons-react";
import { useAuthStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/navbar/AppNav.module.css";

export const AppNavfooter = () => {
    const { startLogout } = useAuthStore();
    return (
        <div className={classes.footer}>
            <a className={classes.link} onClick={startLogout}>
                <IconLogout color="red" className={classes.linkIcon} stroke={1.5} />
                <span>Cerrar sesión</span>
            </a>
        </div>
    );
};
