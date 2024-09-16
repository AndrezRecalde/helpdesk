import { ActionIcon } from "@mantine/core";
import {
    IconAlertCircleFilled,
    IconDiscountCheckFilled,
} from "@tabler/icons-react";

export const BtnActivateElement = ({ cell, handleActive }) => {
    const handleActivate = (e) => {
        e.preventDefault();
        handleActive(cell.row.original);
    };

    return (
        <ActionIcon
            variant="light"
            radius="xl"
            onClick={(e) => handleActivate(e)}
            color={cell.row.original.actvo == 1 ? "teal" : "orange.5"} //Cambiar a un igual mas
        >
            {cell.row.original.actvo == 1 ? (
                <IconDiscountCheckFilled />
            ) : (
                <IconAlertCircleFilled />
            )}
        </ActionIcon>
    );
};
