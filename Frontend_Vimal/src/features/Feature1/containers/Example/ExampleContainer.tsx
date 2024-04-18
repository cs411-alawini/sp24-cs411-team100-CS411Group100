import { useDispatch, useSelector } from "react-redux";
import { ACTION1 } from "../../../../store/types";
import Example from "../../components/Example";

const ExampleContainer = () => {
    const props = useSelector((state: any) => {
        return {Property1: state.app.Property1}
    });

    const dispatch = useDispatch();

    const actions = {
          action1: () => {
            dispatch({ type: ACTION1, props: {Property1: "Welcome to CS 411"} })
          }
    }
    return <Example {...props} {...actions} />
}

export default ExampleContainer;