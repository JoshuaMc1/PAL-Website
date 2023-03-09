import { useState, useEffect } from "react";

function useSuccess(response) {
  const [hasSuccess, setHasSuccess] = useState(false);

  useEffect(() => {
    if (response && response.hasOwnProperty("success")) {
      setHasSuccess(true);
    } else {
      setHasSuccess(false);
    }
  }, [response]);

  return hasSuccess;
}

export default useSuccess;
