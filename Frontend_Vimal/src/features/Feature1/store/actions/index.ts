// Common actions used across modules

import { IAction } from "./Action.interface";

export function action1(): IAction {
    return {
        type: "ACTION1",
        props: {
            Property1: "ActionProperty"
        }
    }
}