import { useEffect, useState } from "react";

function FloatingMessage({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      let timerId;
      timerId = setTimeout(() => {
        setVisible(false);
      }, 1000);

      return () => clearTimeout(timerId); //it doesn't have any effect on the flow of the code. You can remove this
    }
  }, [message]);

  if (visible && message !== "") {
    return (
      <center
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          display: visible ? "block" : "none",
        }}
      >
        <p>{message}</p>
      </center>
    );
  }

  return null;
}

export default FloatingMessage;
