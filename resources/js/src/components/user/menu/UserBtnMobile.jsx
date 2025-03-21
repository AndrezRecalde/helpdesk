import { Button } from "@mantine/core";
import { useAuthStore } from "../../../hooks";

export const UserBtnMobile = () => {
    const { startLogout } = useAuthStore();
    return (
        <Button variant="filled" color="red.7" onClick={startLogout} fullWidth>
            Cerrar Sesión
        </Button>
    );
};
