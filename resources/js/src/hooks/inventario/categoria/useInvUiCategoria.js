import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvCategoria, onOpenModalStockInvCategoria } from "../../../store/inventario/categoria/uiInvCategoriaSlice";

export const useInvUiCategoria = () => {

  const { isOpenModalInvCategoria, isOpenModalStockInvCategoria } = useSelector(state => state.uiInvCategoria);
  const dispatch = useDispatch();

  const modalActionCategoria = (behavior) => {
    dispatch(onOpenModalInvCategoria(behavior));
  }

  const modalActionStockCategoria = (behavior) => {
    dispatch(onOpenModalStockInvCategoria(behavior));
  }

  return {
    isOpenModalInvCategoria,
    isOpenModalStockInvCategoria,

    modalActionCategoria,
    modalActionStockCategoria
  }
}
