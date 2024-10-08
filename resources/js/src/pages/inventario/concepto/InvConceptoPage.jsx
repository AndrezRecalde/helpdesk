import { useEffect } from "react";
import { InvConceptoModal, InvConceptoTable } from "../../../components";
import { useInvConceptoStore } from "../../../hooks";

export const InvConceptoPage = ({ tabValue }) => {
    const { startLoadInvConceptos, startClearInvConceptos } =
        useInvConceptoStore();

    useEffect(() => {
        startLoadInvConceptos();

        return () => {
            startClearInvConceptos();
        };
    }, [tabValue]);

    return (
        <>
            <InvConceptoTable />
            <InvConceptoModal />
        </>
    );
};
