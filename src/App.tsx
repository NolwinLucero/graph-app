import "./App.css";
import React, { useState } from "react";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import {
  Meta,
  Header,
  DataValue,
  Config,
  SubEntityData,
} from "./schemas/schemas";

const App: React.FC = () => {
  const [entities, setEntities] = useState<string[]>([]);
  const [subEntities, setSubEntities] = useState<SubEntityData[]>([]);
  const [config1, setConfig1] = useState<Config[]>([]);
  const [config2, setConfig2] = useState<Config[]>([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://w4m9n4r9.stackpathcdn.com/frontend-test-data.json"
      );
      const jsonResponse = await response.json();
      const {
        data: parentData,
        config1: mainConfig1,
        config2: mainConfig2,
      } = jsonResponse;
      const { meta, headers, data } = parentData.query;

      const filteredAttributes = headers.filter(
        (header: Header) => header.title !== "Browser"
      );

      const attributes = filteredAttributes.map((attribute: Header) => {
        const entityDetails = meta.map((item: Meta, index: number) => {
          const innerData = data[index];

          const datum = innerData.find(
            (innerDatum: DataValue) => innerDatum.k === attribute.key
          );

          return {
            browser: item.title,
            value: datum.v,
          };
        });

        return {
          id: attribute.key,
          header: attribute.title,
          entityDetails,
        };
      });

      setEntities(meta.map((item: Meta) => item.title));
      setSubEntities(attributes);
      setConfig1(mainConfig1);
      setConfig2(mainConfig2);
    }

    getData();
  }, []);

  const data = {
    entities,
    subEntities,
  };

  return (
    <div className="App">
      <Dashboard colConfig={config1} data={data} />
      <Dashboard colConfig={config2} data={data} />
    </div>
  );
};

export default App;
