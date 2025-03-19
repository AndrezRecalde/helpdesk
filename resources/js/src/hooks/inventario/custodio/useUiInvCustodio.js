import { useDispatch, useSelector } from "react-redux";
import { onOpenModalAsignarCustodio } from "../../../store/inventario/custodio/uiInvCustodioSlice";

export const useUiInvCustodio = () => {
    const { isOpenModalAsignarCustodio } = useSelector(
        (state) => state.uiInvCustodio
    );
    const dispatch = useDispatch();

    const modalActionCustodio = (behavior = false) => {
        dispatch(onOpenModalAsignarCustodio(behavior));
    };

    return {
        isOpenModalAsignarCustodio,
        modalActionCustodio
    };
};
