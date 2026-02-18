import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TestAPI() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/test")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">API Test</h1>
      {data && (
        <pre className="mt-2 bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
