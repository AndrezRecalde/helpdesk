import { Box } from "@mantine/core";
import { IconHomeMove } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const MenuHome = ({ classes, toggleDrawer }) => {
    return (
        <Link
            className={classes.link}
            to="/intranet/home"
            onClick={() => toggleDrawer(false)}
        >
            <Box component="span" mr={5}>
                Inicio
            </Box>
            <IconHomeMove size={18} />
        </Link>
    );
};
