import { useDispatch, useSelector } from "react-redux";
import {
    onSetStorageFields,
    onSetStoragePermisoFields,
    onSetStorageUserFields,
} from "../../store/fields/storageFieldsSlice";

export const useStorageField = () => {
    const { storageFields, storageUserFields, storagePermisoFields } =
        useSelector((state) => state.storageField);
    const dispatch = useDispatch();

    const setStorageFields = (fields) => {
        dispatch(onSetStorageFields(fields));
    };

    const setStorageUserFields = (fields) => {
        dispatch(onSetStorageUserFields(fields));
    };

    const setStoragePermisoFields = (fields) => {
        dispatch(onSetStoragePermisoFields(fields));
    };

    const clearStorageFields = () => {
        dispatch(onSetStorageFields(null));
    };

    return {
        storageFields,
        storageUserFields,
        storagePermisoFields,

        setStorageUserFields,
        setStoragePermisoFields,
        setStorageFields,
        clearStorageFields,
    };
};
