import { useEffect, useState } from "react";

function useScript(src:string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script") as HTMLScriptElement;
      script.src = src;
      script.async = true;
    }

    const handleLoad = () => setLoading(false);
    const handleError = (error:any) => setError(error);
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, [src]);
  return [loading, error];
}

export default useScript;
// 참고 : https://www.daleseo.com/react-hooks-use-script/