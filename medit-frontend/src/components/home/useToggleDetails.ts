import { useState } from "react";

export const useToggleDetails = () => {
  const [showSetReminder, setShowSetReminder] = useState(false);
  const [showBackground, setShowBackground] = useState(true);

  const handleAddMedicationToggle = () => {
    setShowSetReminder(!showSetReminder);
    setShowBackground(true);
  };

  const handleReminderSave = () => {
    setShowSetReminder(false);
    setShowBackground(false);
  };

  const handleAddMedicationSave = () => {
    setShowSetReminder(false);
    setShowBackground(false);
  };

  return {
    showSetReminder,
    showBackground,
    handleAddMedicationToggle,
    handleReminderSave,
    handleAddMedicationSave,
  };
};
