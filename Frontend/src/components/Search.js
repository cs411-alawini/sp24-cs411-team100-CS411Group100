import { SearchEmbed } from "@thoughtspot/visual-embed-sdk";
import React from "react";

export const Search = () => {
  React.useEffect(() => {
    const tsSearch = new SearchEmbed("#tse", {
      frameParams: {
        width: "1000px",
        height: "800px",
      },
    });
    tsSearch.render();
  }, []);
  return <div id="tse" />;
};