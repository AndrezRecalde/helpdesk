import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnAddActions,
    BtnSection,
    DescuentoVacacionesTable,
    FilterDescuentoVacacionesForm,
    TitlePage,
} from "../../components";
import {
    IconChevronsRight,
    IconEyeSearch,
    IconList,
} from "@tabler/icons-react";
import { Roles } from "../../helpers/dictionary";
import { useDescuentoStore, useTitlePage } from "../../hooks";
import { useNavigate } from "react-router-dom";

const DescuentoVacacionesPage = () => {
    useTitlePage("Descuentos Vacaciones - Intranet");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const navigate = useNavigate();
    const { startLoadDescuentos, startClearDescuentos } = useDescuentoStore();
    //const { modalActionDescuento } = useUiDescuento();

    /* const handleOpenModalDescuento = () => {
        modalActionDescuento(true);
    }; */

    const handleNavigateSolicitudes = () => {
        navigate("/intranet/solicitudes-vacaciones");
    };

    const handleNavigatePeriodos = () => {
        navigate("/intranet/periodos-vacaciones");
    };

    const menuActions = [
        /* {
            label: "Ingresar Descuento",
            icon: IconPencilDiscount,
            onClick: handleOpenModalDescuento,
            color: "teal",
        }, */
        {
            label: "Ver Solicitudes",
            icon: IconEyeSearch,
            onClick: handleNavigateSolicitudes,
            color: "blue",
        },
        {
            label: "Ver Periodos",
            icon: IconList,
            onClick: handleNavigatePeriodos,
            color: "pink",
        },
    ];

    useEffect(() => {
        return () => {
            startClearDescuentos();
        };
    }, []);

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={1}>Descuentos Vacaciones</TitlePage>
                {usuario.role === Roles.NOM_VACACIONES ? (
                    <BtnAddActions actions={menuActions}>
                        Acciones
                    </BtnAddActions>
                ) : (
                    <BtnSection
                        heigh={45}
                        fontSize={12}
                        IconSection={IconChevronsRight}
                        handleAction={handleNavigateSolicitudes}
                    >
                        Ver Solicitudes
                    </BtnSection>
                )}
            </Group>
            <Divider my="md" />
            <FilterDescuentoVacacionesForm
                startLoadDescuentos={startLoadDescuentos}
            />
            <Divider my="md" />

            <DescuentoVacacionesTable />
        </Container>
    );
};

export default DescuentoVacacionesPage;
