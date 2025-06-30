import { Text } from "@mantine/core";
import classes from "../../../assets/styles/modules/stats/StatsGroup.module.css";

export const StatInfoDepartamento = ({ infoDepartamento }) => {

    const stats = infoDepartamento.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            <Text className={classes.count}>{stat.stats}</Text>
            <Text className={classes.title}>{stat.title}</Text>
        </div>
    ));

    return <div className={classes.root}>{stats}</div>;
};
