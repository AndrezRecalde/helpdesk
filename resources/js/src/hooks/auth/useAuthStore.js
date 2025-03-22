import { useDispatch, useSelector } from "react-redux";
import {
    onAuthenticate,
    onClearErrores,
    onLoadErrores,
    onLoadProfile,
    onLoadToken,
    onLoading,
    onLogout,
    onValidate,
} from "../../store/auth/authSlice";
import { useErrorException } from "../../hooks";
import {
    useMantineColorScheme,
} from "@mantine/core";
import helpdeskApi from "../../api/helpdeskApi";

export const useAuthStore = () => {
    const { clearColorScheme  } = useMantineColorScheme();
    const { isLoading, user, token, profile, validate, errores } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLogin = async ({ lgin, paswrd }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/auth/login", {
                lgin,
                paswrd,
            });
            const { user, access_token } = data;
            localStorage.setItem("service_user", JSON.stringify(user));
            localStorage.setItem("auth_token", access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onLoadToken(access_token));
            dispatch(onAuthenticate(user));
        } catch (error) {
            //console.log(error);
            error.response.data.errores
                ? dispatch(onValidate(error.response.data.errores))
                : dispatch(onLogout(error.response.data.msg));

            setTimeout(() => {
                //dispatch(onClearValidates());
                dispatch(onClearErrores());
            }, 2000);
        }
    };

    const checkAuthToken = async () => {
        //const token = localStorage.getItem("auth_token");
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await helpdeskApi.post("/refresh",{});
            const { user, access_token } = data;
            localStorage.setItem("service_user", JSON.stringify(user));
            localStorage.setItem("auth_token", access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
            dispatch(onLoadToken(access_token));
        } catch (error) {
            //console.log(error);
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startProfile = async () => {
        try {
            dispatch(onLoading(true));
            //const user = await JSON.parse(localStorage.getItem("service_user"));
            const { data } = await helpdeskApi.get("/profile");
            const { profile } = data;
            dispatch(onLoadProfile(profile));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearProfile = () => {
        dispatch(onLoadProfile({}));
    };

    const startLogout = async () => {
        try {
            await helpdeskApi.post("/auth/logout");
            localStorage.clear();
            dispatch(onLogout());
            clearColorScheme();
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
            clearColorScheme();
        }
    };

    return {
        isLoading,
        user,
        token,
        profile,
        validate,
        errores,

        startLogin,
        checkAuthToken,
        startProfile,
        clearProfile,
        startLogout
    };
};
