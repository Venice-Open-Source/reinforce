import React, { Component } from "react";

const SetContainer = () => {
  return (
    <div>
      <div>
        <form className="add-set">
          <input id="set"></input>
          <button type="submit">Add Set</button>
        </form>
      </div>
      <Sets />
    </div>
  );
};

export default SetContainer;
