import { useGamificationStore } from "../../store/gamification-store";

const GamificationModal: React.FC = () => {
  const showGamificationModal = useGamificationStore(
    (state) => state.showGamificationModal
  );
  const modalContent = useGamificationStore((state) => state.modalContent);
  const closeGamificationModal = useGamificationStore(
    (state) => state.closeGamificationModal
  );

  if (!showGamificationModal) return null;

  return <></>;
};

export default GamificationModal;
