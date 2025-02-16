import React from "react";
import { ListItem } from "@mui/material";

interface LabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  style?: React.CSSProperties;
}

export const Label: React.FC<LabelProps> = ({
  inputName,
  img,
  placeholder,
  showHr = true,
}) => {
  return (
    <>
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt="User Icon"
          style={{ paddingRight: "20px", width: "2.2rem" }}
        />
        <input
          placeholder={placeholder}
          type="text"
          id={inputName}
          name={inputName}
          style={{
            colorScheme: "none",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            width: "75%",
            height: "3rem",
            fontSize: "1.2rem",
            color: "black",
            fontWeight: "600",
          }}
        />
        <style>{`
          input::placeholder {
            color: rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </ListItem>
      {showHr === true && (
        <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />
      )}
    </>
  );
};
