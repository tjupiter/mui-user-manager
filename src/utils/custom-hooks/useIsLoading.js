import { useState } from "react";

export default function useIsLoading() {
  const [isLoading, setIsLoading] = useState(true);
  return {
    isLoading,
    loadingStarted: () => setIsLoading(true),
    loadingFinished: () => setIsLoading(false),
    toggleLoading: () => () => setIsLoading(!isLoading),
    setIsLoading,
  };
}
