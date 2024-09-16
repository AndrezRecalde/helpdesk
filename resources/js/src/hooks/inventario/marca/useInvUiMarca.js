import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvMarca } from "../../../store/inventario/marca/uiInvMarcaSlice";

export const useInvUiMarca = () => {

  const { isOpenModalInvMarca } = useSelector(state => state.uiInvMarca);
  const dispatch = useDispatch();

  const modalActionMarca = (behavior) => {
    dispatch(onOpenModalInvMarca(behavior));
  }

  return {
    isOpenModalInvMarca,

    modalActionMarca
  }
}
