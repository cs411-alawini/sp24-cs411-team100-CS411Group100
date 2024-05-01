import { Action, AppEmbed } from "@thoughtspot/visual-embed-sdk";
import React from "react";

  
export const EmbedLiveboard = () => {
React.useEffect(() => {
const embed = new AppEmbed("#full-embed", {
    frameParams: {},
    path: "pinboard/22e79c21-eec4-40bf-997b-7454c6e3a2a5",
    disabledActions: [],
    disabledActionReason: "Reason for disabling",
    hiddenActions: [
    Action.Edit,
    Action.EditTitle,
    ],
});
embed.render();
},[]);
return <div id='full-embed' />
}