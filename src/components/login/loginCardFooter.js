function LoginCardFooter({ message, clickedRedirect, linkMessage }) {
  return (
    <div
      id="formFooter"
      style={{
        backgroundColor: "rgb(246, 246, 246)",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "rgb(220, 232, 241)",
        padding: "25px",
        textAlign: "center",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
      }}
    >
      <span style={{ color: "black" }}>{message} </span>
      <span
        className="underlineHover"
        onClick={clickedRedirect}
        style={{ color: "blue" }}
      >
        {linkMessage}
      </span>
    </div>
  );
}

export { LoginCardFooter };
