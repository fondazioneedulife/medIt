import React from "react";
import { ListItem } from "@mui/material";

interface LabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  style?: React.CSSProperties;
}

export const Label: React.FC<LabelProps> = ({
  inputName,
  img,
  placeholder,
}) => {
  return (
    <>
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img src={img} alt="User Icon" style={{ paddingRight: "30px" }} />
        <input
          placeholder={placeholder}
          type="text"
          id={inputName}
          name={inputName}
          style={{ colorScheme: "none" }}
        />
        <hr />
      </ListItem>
    </>
  );
};
