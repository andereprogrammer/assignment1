import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import "./Upload.css";
import { Loader } from "rsuite";

function MultiImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();

  const toggleImageSelection = (index) => {
    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].selected = !updatedImages[index].selected;
      setSelectedImages(updatedImages.filter((image) => image.selected));
      return updatedImages;
    });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Create an array of preview images
    const previewImages = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      selected: true,
      file: file,
    }));

    setSelectedImages(previewImages);
    setPreviewImages(previewImages);
  };

  const handleUpload = () => {
    setLoading(true);
    selectedImages.map((file) => {
      const imgref = ref(storage, `images/${file.file.name + v4()}`);
      uploadBytes(imgref, file.file)
        .then((res) => {
          fileInput.current.value = null;
          setLoading(false);
          setSelectedImages([]);
          setPreviewImages([]);
        })
        .catch((e) => {
          console.log(e);
        });
    });
    setReset(true);
  };
  useEffect(() => {
    if (selectedImages.length === 0) {
      fileInput.current.value = null;
    }
    setReset(false);
  }, [reset, previewImages]);

  return (
    <div className="main__container flex__box_initialize">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="image__input"
        ref={fileInput}
      />

      <div className="image__box">
        {previewImages.length > 0 ? (
          previewImages.map((previewImage, index) => {
            return (
              previewImage.selected && (
                <img
                  key={index}
                  src={previewImage.url}
                  alt="Preview"
                  onClick={() => toggleImageSelection(index)}
                  className={`image__container ${
                    previewImage.selected ? "active" : null
                  }`}
                />
              )
            );
          })
        ) : (
          <span className="flex__box_initialize span__preview_text">
            Select Images will Preview here
          </span>
        )}
      </div>

      <div className="flex__box_initialize">
        {loading ? (
          <div className="upload__cta">
            <Loader size="lg" content="Uploading Please wait" />
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={selectedImages.length === 0}
            className="upload__cta"
          >
            Uplaod Images
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiImageUpload;
