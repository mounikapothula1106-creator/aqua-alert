import { useEffect, useState } from "react";

export default function IotDashboard() {
  const [value, setValue] = useState(20);
  const [alertLatched, setAlertLatched] = useState(false);
  const [safe, setSafe] = useState(true);

  const THRESHOLD = 75;

  function nextValue(prev: number) {
    if (safe) {
      const wiggle = prev + (Math.random() * 2 - 1); // tiny wiggle
      if (Math.random() < 0.02) setSafe(false); // after ~30s, switch to unsafe
      return wiggle;
    } else {
      return prev + Math.random() * 3; // rising faster
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        const newVal = parseFloat(nextValue(prev).toFixed(2));
        if (newVal >= THRESHOLD) {
          setAlertLatched(true);
        }
        return newVal;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [safe]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1>🌍 IoT Disaster Alert Dashboard</h1>
      <div style={{ fontSize: "28px", margin: "20px" }}>Sensor: {value}</div>
      {alertLatched && (
        <>
          <div style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}>
            🚨 ALERT: Threshold Crossed!
          </div>
          <button
            style={{
              margin: "10px",
              padding: "8px 15px",
              backgroundColor: "white",
              color: "red",
              border: "2px solid red",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => setAlertLatched(false)}
          >
            Clear Alert
          </button>
        </>
      )}
    </div>
  );
}
