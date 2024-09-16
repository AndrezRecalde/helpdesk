import { useDispatch, useSelector } from "react-redux"
import { onOpenModalTipoCategoria } from "../../../store/inventario/tipocategoria/uiInvTipocategoriaSlice";

export const useInvUiTipocategoria = () => {

  const { isOpenModalInvTipoCategoria } = useSelector(state => state.uiInvTipocategoria);
  const dispatch = useDispatch();

  const modalActionTipocategoria = (behavior) => {
    dispatch(onOpenModalTipoCategoria(behavior));
  }

  return {
    isOpenModalInvTipoCategoria,

    modalActionTipocategoria
  }
}
