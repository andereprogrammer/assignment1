import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import "./Upload.css";
import { Loader } from "rsuite";
window.Buffer = window.Buffer || require("buffer").Buffer;

function Preview() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageRef = ref(storage, "images/");
  useEffect(() => {
    setLoading(true);
    listAll(imageRef)
      .then((result) => {
        const uniqueURLs = new Set();

        Promise.all(result.items.map((item) => getDownloadURL(item))).then(
          (urls) => {
            urls.forEach((url) => uniqueURLs.add(url));

            setImageList(Array.from(uniqueURLs));
            setLoading(false);
          }
        );
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="main__container flex__box_initialize">
      <h4>All your images from the Drive are listed below </h4>
      <div className="image__box">
        {loading ? (
          <span className="flex__box_initialize span__preview_text">
            <p>Your images will appear here</p>
          </span>
        ) : (
          imageList.map((previewImage, index) => {
            return (
              <img
                key={index}
                src={previewImage}
                alt="Preview"
                className={`image__container ${
                  previewImage.selected ? "active" : null
                }`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Preview;
