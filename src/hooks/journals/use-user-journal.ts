import { useEffect, useState } from "react";
import { getUserJournals } from "../../data/journal/fetch-requests";
import { AllUserJournals } from "../../utils/types/types";

const useUserJournal = () => {
  const [userJournals, setUserJournals] = useState<AllUserJournals | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserJournals()
      .then(setUserJournals)
      .catch((error) => console.error("Failed to get user journals", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    userJournals,
    isLoading,
  };
};

export { useUserJournal };
