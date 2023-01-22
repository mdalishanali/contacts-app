import React from "react";
import LodingSvg from "../assets/loader.svg";

export default function Loader() {
  return (
    <div>
      <div className="parent_div">
        <div>
          <img src={LodingSvg} className="image" alt="loader" height={55} />
        </div>
      </div>
    </div>
  );
}
