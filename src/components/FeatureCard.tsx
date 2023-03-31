import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "@/styles/FeatureCard.module.css";
import BuildingIcon from "./icons/Building";
import maskPossiblePhone from "@/utils/maskPossiblePhone";
import formatCurrency from "@/utils/formatCurrency";

import "swiper/css";
import "swiper/css/navigation";

interface FeatureCardProps extends MockData {}

export function FeatureCard(props: FeatureCardProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  const toggleDescriptionVisibility = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      setIsDescriptionVisible(!isDescriptionVisible);
    },
    [isDescriptionVisible]
  );

  useEffect(() => {
    if (!router.isReady) return;

    setIsDescriptionVisible(false);
  }, [router]);

  return (
    <div className={styles["FeatureCard-root"]}>
      <style global jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: auto;
          height: 100%;
          margin-top: 0;
          padding: 0 20px;
        }
        .swiper:hover .swiper-button-next:not(.swiper-button-disabled),
        .swiper:hover .swiper-button-prev:not(.swiper-button-disabled) {
          opacity: 1;
        }
        .swiper:hover .swiper-button-next {
          background: linear-gradient(to right, transparent, #999);
        }
        .swiper:hover .swiper-button-prev {
          background: linear-gradient(to left, transparent, #999);
        }
        .swiper:not(:hover) .swiper-button-next,
        .swiper:not(:hover) .swiper-button-prev {
          opacity: 0;
        }
      `}</style>
      <div className={styles["FeatureCard-sign"]}>Launching Soon</div>
      <div className={styles["FeatureCard-container"]}>
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className={styles["FeatureCard-swiper"]}
        >
          {props.pic?.length
            ? props.pic.map((picUrl, picIndex) => (
                <SwiperSlide key={picIndex}>
                  <img
                    className={styles["FeatureCard-cover"]}
                    src={picUrl}
                    alt={`Thumbnail - ${props.title}`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))
            : ""}
        </Swiper>
        <div className={styles["FeatureCard-content"]}>
          <div className={styles["FeatureCard-summary"]}>
            <div className={styles["FeatureCard-summary__container"]}>
              <div className={styles["FeatureCard-summary__heading"]}>
                <div className={styles["FeatureCard-summary__heading-icon"]}>
                  <BuildingIcon />
                </div>
                <div>
                  <h1 className={styles["FeatureCard-summary__heading-title"]}>
                    {props.title}
                  </h1>
                  <p className={styles["FeatureCard-summary__heading-meta"]}>
                    {props.address}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  {props.project_type} · {props.year} · {props.ownership_type}
                </p>
                <p>{props.availabilities_label}</p>
              </div>
            </div>
            <div>
              <p className={styles["FeatureCard-summary__price-range"]}>
                ${formatCurrency(props.psf_min)} - $
                {formatCurrency(props.psf_max)} psf
              </p>
              <p className={styles["FeatureCard-summary__heading-meta"]}>
                {props.subprice_label}
              </p>
            </div>
          </div>

          {!isDescriptionVisible ? (
            <div className={styles["FeatureCard-action"]}>
              <button
                onClick={toggleDescriptionVisibility}
                className={styles["FeatureCard-action__more"]}
              >
                See description
              </button>
            </div>
          ) : (
            ""
          )}

          {isDescriptionVisible ? (
            <p className={styles["FeatureCard-description"]}>
              {maskPossiblePhone(props.description)}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
