import { IconLogout } from "@tabler/icons-react";

import classes from "../../../assets/styles/modules/layout/navbar/AppNav.module.css";

export const AppNavfooter = () => {
    return (
        <div className={classes.footer}>
            <a
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
            >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
            </a>
        </div>
    );
};
