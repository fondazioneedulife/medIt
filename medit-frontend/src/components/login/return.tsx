import IconArrow from "../../assets/icon/icon_arrow.svg";

export const Return: React.FC = () => {
  return (
    <>
      <div style={{ width: "95%", marginBottom: "2rem" }}>
        <img
          src={IconArrow}
          alt="User Icon"
          style={{ width: "1rem", cursor: "pointer" }}
        />
      </div>
    </>
  );
};
