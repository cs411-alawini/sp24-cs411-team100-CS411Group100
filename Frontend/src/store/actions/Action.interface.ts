import { IIntialState } from "../reducers/IntialState.interface";

export interface IAction {
    type: string,
    props: IIntialState
}