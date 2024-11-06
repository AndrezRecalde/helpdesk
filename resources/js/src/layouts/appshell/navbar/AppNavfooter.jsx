//import { IconLogout } from "@tabler/icons-react";
//import { useAuthStore } from "../../../hooks";
import { UserBtnHeader } from "../../../components";
//import classess from "../../../assets/styles/modules/layout/navbar/AppHeader.module.css";
import classes from "../../../assets/styles/modules/user/UserHeader.module.css";


export const AppNavfooter = ({ toggleMobile }) => {
    //const { startLogout } = useAuthStore();
    return (
        <div className={classes.footer}>
            <UserBtnHeader classes={classes} toggleMobile={toggleMobile} />
        </div>
    );
};
