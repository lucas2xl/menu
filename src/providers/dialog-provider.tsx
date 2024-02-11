import { useEffect, useState } from "react";

import { StoreDialog } from "@/components/dialogs/store-dialog";

export function DialogProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <StoreDialog />;
}
