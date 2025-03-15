import { useState } from "react";

export const useToggleDetails = () => {
  const [showSetReminder, setShowSetReminder] = useState(false);
  const [showBackground, setShowBackground] = useState(true);

  const handleAddDetailsToggle = () => {
    setShowSetReminder(!showSetReminder);
    setShowBackground(true); // Show background when SetReminder is opened
  };

  const handleReminderSave = () => {
    setShowSetReminder(false);
    setShowBackground(false); // Hide background when reminder is saved
  };

  const handleAddDetailsSave = () => {
    setShowSetReminder(false);
    setShowBackground(false); // Hide background when AddDetails is saved
  };

  return {
    showSetReminder,
    showBackground,
    handleAddDetailsToggle,
    handleReminderSave,
    handleAddDetailsSave,
  };
};
