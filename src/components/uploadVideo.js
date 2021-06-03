import React, { useState } from "react";
import { fetchPhotos, openUploadWidget } from "../helpers/CloudinaryService";

const UploadVideo = (props) => {
  const [images, setImages] = useState([]);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "dlcchx1ch",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImages([photos.info.path]);
          let data = {
            url: photos.info.path,
            name: props.name,
          };
          props.setMediaUrl(data.url);
        }
      } else {
        console.log(error);
      }
    });
  };
  return (
    <div className="Main">
      {images.length == 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            beginUpload();
          }}
        >
          Télécharger photos
        </button>
      )}
      {images.length > 0 && (
        <div>
          {images[0]}
          <button
            onClick={(e) => {
              e.preventDefault();
              props.deleteMediaUrl();
              setImages([]);
            }}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
