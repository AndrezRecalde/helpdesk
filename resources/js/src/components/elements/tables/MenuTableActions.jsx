import { Menu, rem } from "@mantine/core";
import PropTypes from "prop-types";

/**
 * Componente genérico y reutilizable para renderizar acciones de menú en tablas
 *
 * @param {Object} props
 * @param {Object} props.row - Objeto row de react-table que contiene row.original con los datos
 * @param {Array} props.actions - Array de configuración de acciones
 * @param {Object} props.actions[].icon - Componente de icono de Tabler
 * @param {string} props.actions[].label - Texto a mostrar en el menú
 * @param {Function} props.actions[].onClick - Handler que recibe row.original como parámetro
 * @param {boolean|Function} [props.actions[].disabled] - Condición de disabled (booleano o función que recibe row.original)
 * @param {boolean|Function} [props.actions[].visible] - Condición de visibilidad (booleano o función que recibe row.original)
 * @param {string} [props.actions[].color] - Color opcional del item del menú
 */
export const MenuTableActions = ({ row, actions = [] }) => {
    const rowData = row.original;

    return (
        <>
            {actions.map((action, index) => {
                // Evaluar visibilidad
                const isVisible =
                    typeof action.visible === "function"
                        ? action.visible(rowData)
                        : action.visible !== false; // Por defecto visible si no se especifica

                if (!isVisible) {
                    return null;
                }

                // Evaluar disabled
                const isDisabled =
                    typeof action.disabled === "function"
                        ? action.disabled(rowData)
                        : action.disabled === true;

                const IconComponent = action.icon;

                return (
                    <Menu.Item
                        key={`menu-action-${index}`}
                        leftSection={
                            IconComponent ? (
                                <IconComponent
                                    style={{ width: rem(15), height: rem(15) }}
                                />
                            ) : null
                        }
                        onClick={() => action.onClick(rowData)}
                        disabled={isDisabled}
                        color={action.color}
                    >
                        {action.label}
                    </Menu.Item>
                );
            })}
        </>
    );
};

MenuTableActions.propTypes = {
    row: PropTypes.object.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType,
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
            visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
            color: PropTypes.string,
        }),
    ).isRequired,
};
