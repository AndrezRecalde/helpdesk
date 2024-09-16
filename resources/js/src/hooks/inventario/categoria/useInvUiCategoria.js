import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvCategoria } from "../../../store/inventario/categoria/uiInvCategoriaSlice";

export const useInvUiCategoria = () => {

  const { isOpenModalInvCategoria } = useSelector(state => state.uiInvCategoriaSlice);
  const dispatch = useDispatch();

  const modalActionCategoria = (behavior) => {
    dispatch(onOpenModalInvCategoria(behavior));
  }

  return {
    isOpenModalInvCategoria,

    modalActionCategoria
  }
}
