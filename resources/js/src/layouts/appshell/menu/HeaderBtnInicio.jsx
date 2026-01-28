import { Box } from "@mantine/core";
import { IconHomeMove } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const HeaderBtnInicio = ({ classes }) => {
    return (
        <Link
            className={classes.link}
            to="/intranet/home"
        >
            <Box component="span" mr={5}>
                Inicio
            </Box>
            <IconHomeMove size={18} />
        </Link>
    );
};
