import { useNavigate as useTSNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function Navigate({ to }: { to: string }) {
  const navigate = useTSNavigate();
  useEffect(() => {
    void navigate({ to });
  }, [navigate, to]);
  return null;
}
