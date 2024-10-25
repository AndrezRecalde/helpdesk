import { ActionIcon } from "@mantine/core";
import { IconCloudDownload } from "@tabler/icons-react";

export const BtnDownloadDocumento = ({ cell, handleDownload }) => {

    const handleActivate = (e) => {
        e.preventDefault();
        handleDownload(cell.row.original);
    };

    return (
        <ActionIcon
            variant="transparent"
            radius="xl"
            onClick={(e) => handleActivate(e)}
        >
                <IconCloudDownload />
        </ActionIcon>
    );
};
