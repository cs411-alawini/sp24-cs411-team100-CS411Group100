import React from "react";
import { IExampleProps } from "./Example.constants";


function Example(props: IExampleProps) {

    const onClickDiv = () => {
        props?.action1();
    }
    
    return <div onClick={onClickDiv}>{props.Property1}</div>;
}

export default Example;