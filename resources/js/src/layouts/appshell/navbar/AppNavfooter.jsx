//import { IconLogout } from "@tabler/icons-react";
//import { useAuthStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/navbar/AppNav.module.css";
import { UserBtnHeader } from "../../../components";
import classess from "../../../assets/styles/modules/layout/navbar/AppHeader.module.css"

export const AppNavfooter = ({ toggleMobile }) => {
    //const { startLogout } = useAuthStore();
    return (
        <div className={classes.footer}>
            <UserBtnHeader classes={classess} toggleMobile={toggleMobile} />
        </div>
    );
};
