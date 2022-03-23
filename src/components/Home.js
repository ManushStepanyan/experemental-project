import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <div style={{ marginTop: "2%" }}>
        <h1>Wellcome</h1>
      </div>
      <div>Enjoy your ride in this site!</div>
      <div>
        <h2>Let us to introduce what you can find here.</h2>
      </div>
      <div className="features-remember-intro">
        <div>
          In second section named Flows, you can find all information of about
          flows.
        </div>
        <div>Each flow consists of 3 fields named: Name, Version and Type.</div>
      </div>
      <div>
        <h2>What you can do with them?</h2>
      </div>
      <div className="features-remember-intro">
        <h3>You can.</h3>
        <ul>
          <li>Add flows whatever content you wish.</li>
          <li>Edit them whenever you wish.</li>
          <li>Delete them, if somehow you find them useless.</li>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>So you think this is all you can do??</h2>
        <h3>Answer is no.</h3>
        <div className="features-remember-intro">
          <div>
            There is one more great feature. You can do search by Name and Version.</div>
        </div>
        <div className="features-remember-intro" style={{marginBottom: '5%'}}>
          <h3 style={{textAlign: 'center'}}>
            This is all you need to know. Now don't waste your time, just try
            and enjoy.
          </h3>
          <h1>Remember.</h1>
          <h2>Your smile is adorable, so always smile ))))))</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;