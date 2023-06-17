import React from "react";
import Upgrade from "./Upgrade";

function UpgradeContainer() {
  return (
    <div className="col-start-3">
      <div className="border-2 border-red-500">
        <h1 className="text-center text-2xl p-2">Bait and Tackle</h1>
      </div>
      <Upgrade />
    </div>
  )
}

export default UpgradeContainer