import React from "react";
import "./galleryitem.styles.css";

export default function GalleryItems({ dataSrc }) {
  const sizes = () =>
    "(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw";

  const initDataSrcSet = (url) => {
    return [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "1000",
      "1100",
      "1200",
      "1296",
      "1400",
      "1600",
      "1800",
      "2000",
      "2200",
      "2400",
      "2592",
    ]
      .map((v) => `${url}?width=${v} ${v}w`)
      .join(", ");
  };

  return (
    <div className="item">
      <img
        className="lazy"
        sizes={sizes()}
        data-src={dataSrc}
        data-srcset={initDataSrcSet(dataSrc)}
        alt=""
      />
    </div>
  );
}
