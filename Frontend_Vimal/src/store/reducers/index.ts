// Common states across modules

import { IAction } from "../actions/Action.interface";
import { IIntialState } from "./IntialState.interface";

const INITIAL_STATE: IIntialState = {
    Property1: "Click here",
    Property2: "Someother String"
}

export default function app(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case 'ACTION1':
            return {
                ...state,
                Property1: action.props.Property1
            }
        default:
            return state;
    }
}