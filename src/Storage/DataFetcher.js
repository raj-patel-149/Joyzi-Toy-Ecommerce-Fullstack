import React, { useState, useEffect } from "react";

const DataFetcher = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch("./src/Storage/storage.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching: ", error));
  }, []);

  return jsonData;
};

export default DataFetcher;
