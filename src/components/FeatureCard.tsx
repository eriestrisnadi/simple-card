import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import router from "next/router";
import styles from "@/styles/FeatureCard.module.css";
import BuildingIcon from "./icons/Building";

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
      <div className={styles["FeatureCard-sign"]}>Launching Soon</div>
      <div className={styles["FeatureCard-container"]}>
        <img
          className={styles["FeatureCard-cover"]}
          src={props.pic?.length ? props.pic[0] : ""}
          alt={`Thumbnail - ${props.title}`}
        />
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
                ${props.psf_min} - ${props.psf_max}
              </p>
              <p className={styles["FeatureCard-summary__heading-meta"]}>
                {props.subprice_label}
              </p>
            </div>
          </div>
          <div className={styles["FeatureCard-action"]}>
            {!isDescriptionVisible ? (
              <button
                onClick={toggleDescriptionVisibility}
                className={styles["FeatureCard-action__more"]}
              >
                See description
              </button>
            ) : (
              ""
            )}
          </div>
          {isDescriptionVisible ? (
            <p className={styles["FeatureCard-description"]}>
              {props.description}
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
