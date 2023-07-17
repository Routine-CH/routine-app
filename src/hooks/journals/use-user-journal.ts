import { useEffect, useState } from "react";
import {
  getTodaysJournals,
  getUserJournals,
} from "../../data/journal/fetch-requests";
import { AllUserJournals, UserJournals } from "../../utils/types/types";

const useUserJournal = () => {
  const [todaysJournal, setTodaysJournal] = useState<UserJournals | null>(null);
  const [userJournals, setUserJournals] = useState<AllUserJournals | null>(
    null
  );
  const [isLoadingTodaysJournal, setIsLoadingTodaysJournal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodaysJournals()
      .then(setTodaysJournal)
      .catch((error) => console.error("Failed to get user journals", error))
      .finally(() => {
        setIsLoadingTodaysJournal(false);
      });

    getUserJournals()
      .then(setUserJournals)
      .catch((error) => console.error("Failed to get user journals", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    todaysJournal,
    userJournals,
    isLoading,
    isLoadingTodaysJournal,
  };
};

export { useUserJournal };
