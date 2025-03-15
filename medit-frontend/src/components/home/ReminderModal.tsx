import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SetReminder } from "../home/SetReminder/SetReminder.tsx";

interface ReminderModalProps {
  showSetReminder: boolean;
  showBackground: boolean;
  handleReminderSave: () => void;
  handleAddDetailsSave: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  showSetReminder,
  showBackground,
  handleReminderSave,
  handleAddDetailsSave,
}) => {
  return (
    <AnimatePresence>
      {showSetReminder && (
        <>
          {showBackground && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          )}
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "80vh",
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SetReminder
              onSave={handleReminderSave}
              medicineId={0}
              onAddDetailsSave={handleAddDetailsSave}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
