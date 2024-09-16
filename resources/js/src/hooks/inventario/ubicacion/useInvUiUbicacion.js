import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvUbicacion } from "../../../store/inventario/ubicacion/uiInvUbicacionSlice";

export const useInvUiUbicacion = () => {

  const { isOpenModalInvUbicacion } = useSelector(state => state.uiInvUbicacion);
  const dispatch = useDispatch();

  const modalActionUbicacion = (behavior) => {
    dispatch(onOpenModalInvUbicacion(behavior));
  }

  return {
    isOpenModalInvUbicacion,

    modalActionUbicacion
  }
}
