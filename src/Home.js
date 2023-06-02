import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
function Home() {
  return (
    <div className="home">
      <>
        <div className="upload-link">
          <Link className="link" to={"/upload"}>
            <div>Upload</div>
          </Link>
        </div>
        <div className="upload-link">
          <Link className="link" to={"/preview"}>
            <div>Preview</div>
          </Link>
        </div>
      </>
    </div>
  );
}

export default Home;
