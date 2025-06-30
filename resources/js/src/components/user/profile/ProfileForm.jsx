import { SimpleGrid, Skeleton } from "@mantine/core";
import { useAuthStore } from "../../../hooks";
import { ProfileField } from "../../../components";

const profileFields = [
    { key: "empresa", label: "Institución" },
    { key: "direccion", label: "Dirección/Gestión" },
    {
        key: "nmbre_usrio",
        label: "Apellidos y Nombres",
        transform: (val) => val?.toUpperCase(),
    },
    {
        key: "cargo",
        label: "Cargo",
        fallback: "Sin datos, por favor comunicarse con Recursos Humanos...",
    },
    {
        key: "tipo_contrato",
        label: "Tipo de Contrato",
        fallback: "Sin datos, por favor comunicarse con Recursos Humanos...",
    },
    {
        key: "nombre_regimen",
        label: "Régimen de contratación",
        fallback: "Sin datos, por favor comunicarse con Recursos Humanos...",
    },
];

export const ProfileForm = () => {
    const { isLoading, profile } = useAuthStore();
    const arr = [1, 2, 3, 4, 5, 6];
    return (
        <>
            {isLoading ? (
                arr.map((e) => (
                    <Skeleton key={e} height={15} mt={20} radius="xl" />
                ))
            ) : (
                <SimpleGrid cols={1}>
                    {profileFields.map(
                        ({
                            key,
                            label,
                            fallback = "Sin datos...",
                            transform,
                        }) => (
                            <ProfileField
                                key={key}
                                value={
                                    transform
                                        ? transform(profile?.[key])
                                        : profile?.[key] || fallback
                                }
                                label={label}
                            />
                        )
                    )}
                </SimpleGrid>
            )}
        </>
    );
};
