import { Action, AppEmbed } from "@thoughtspot/visual-embed-sdk";
import React from "react";

  
export const EmbedLiveboard = () => {
React.useEffect(() => {
const embed = new AppEmbed("#full-embed", {
    frameParams: {
          width: "1000px",
          height: "800px",
        },
    path: "pinboard/41aa543a-18b6-421b-8838-a53932c4d78a",
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