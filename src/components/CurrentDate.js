import React, { useState, useEffect } from "react";

const CurrentDate = () => {
  const [day, setDay] = useState(new Date().toDateString());

  useEffect(() => {
    const dayID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(dayID);
    };
  }, []);

  const tick = () => {
    setDay(new Date().toDateString());
  };

  return <div>{day}</div>;
};

export default CurrentDate;