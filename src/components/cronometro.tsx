import { useEffect, useRef, useState } from "react";

export function useCronometro() {
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const iniciar = () => {
    if (!ativo) {
      setAtivo(true);
      intervalRef.current = setInterval(() => {
        setSegundos((s) => s + 1);
      }, 1000);
    }
  };

  const parar = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setAtivo(false);
  };

  const resetar = () => {
    parar();
    setSegundos(0);
  };

  useEffect(() => {
    return () => parar(); 
  }, []);

  return { segundos, iniciar, parar, resetar };
}
