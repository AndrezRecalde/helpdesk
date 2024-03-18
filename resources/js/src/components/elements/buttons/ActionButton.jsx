import { ActionIcon, rem } from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";

export const ActionReportPDF = ({ handleExportDataPDF }) => (
    <ActionIcon
        size={40}
        variant="filled"
        color="red.7"
        aria-label="Exportacion pdf"
        onClick={handleExportDataPDF}
    >
        <IconFileTypePdf
            stroke={2}
            style={{ width: rem(24), height: rem(24) }}
        />
    </ActionIcon>
);
