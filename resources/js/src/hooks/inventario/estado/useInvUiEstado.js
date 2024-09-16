import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvEstado } from "../../../store/inventario/estado/uiInvEstadoSlice";

export const useInvUiEstado = () => {

 const { isOpenModalInvEstado } = useSelector(state => state.uiInvEstado);
 const dispatch = useDispatch();

 const modalActionEstado = (behavior) => {
    dispatch(onOpenModalInvEstado(behavior));
 }

  return {
    isOpenModalInvEstado,

    modalActionEstado
  }
}
