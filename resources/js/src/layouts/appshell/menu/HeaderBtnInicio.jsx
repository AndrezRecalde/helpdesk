import { Box } from "@mantine/core";
import { IconHomeCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const HeaderBtnInicio = ({ classes, theme }) => {
    return (
        <Link
            className={classes.link}
            to="/intranet/home"
        >
            <Box component="span" mr={5}>
                Inicio
            </Box>
            <IconHomeCheck size={16} color={theme.colors.teal[6]} />
        </Link>
    );
};
