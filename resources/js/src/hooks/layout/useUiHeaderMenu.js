import { useDispatch, useSelector } from "react-redux";
import {
    onOpenDrawerMobile,
    onOpenMenuLinksGestionGeneral,
    onOpenMenuLinksPermisos,
    onOpenMenuLinksTics,
    onOpenModalAside,
} from "../../store/layout/header/uiHeaderMenuSlice";

export const useUiHeaderMenu = () => {
    const {
        isOpenModalAside,
        isOpenDrawerMobile,
        isOpenMenuLinksTics,
        isOpenMenuLinksGestionGeneral,
        isOpenMenuLinksPermisos,
    } = useSelector((state) => state.uiHeaderMenu);
    const dispatch = useDispatch();

    const modalActionAside = (behavior = false) => {
        dispatch(onOpenModalAside(behavior));
    };

    const modalActionDrawerMobile = (behavior = false) => {
        dispatch(onOpenDrawerMobile(behavior));
    };

    const modalMenuLinksTics = (behavior = false) => {
        dispatch(onOpenMenuLinksTics(behavior));
    }

    const modalMenuLinksGestionGeneral = (behavior) => {
        dispatch(onOpenMenuLinksGestionGeneral(behavior));
    }

    const modalMenuLinksPermisos = (behavior = false) => {
        dispatch(onOpenMenuLinksPermisos(behavior));
    }

    return {
        isOpenModalAside,
        isOpenDrawerMobile,
        isOpenMenuLinksTics,
        isOpenMenuLinksGestionGeneral,
        isOpenMenuLinksPermisos,

        modalActionAside,
        modalActionDrawerMobile,
        modalMenuLinksTics,
        modalMenuLinksGestionGeneral,
        modalMenuLinksPermisos
    };
};
