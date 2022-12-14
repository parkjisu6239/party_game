import React from "react";
import { css } from "@emotion/css";
import { defaultBoxCss, small } from "src/styles";

const imageWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 65vh;
  min-width: 600px;
  min-height: 400px;
  overflow: hidden;
  ${defaultBoxCss}
  > * {
    width: 100%;
    height: 100%;
  }
  ${small} {
    width: 100vw;
    min-width: 100%;
    height: 400px;
  }
`;

const pauseImage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4d4d4;
  border-radius: 5px;
  ${small} {
    width: 100%;
  }
`;

const gameImage = css`
  object-fit: contain;
`;

interface Props {
  image: string;
  alt: string;
  pause: boolean;
}

const GameImage = ({ image, alt, pause }: Props) => (
  <div className={imageWrapper}>
    {pause ? <div className={pauseImage}>pause</div> : (
      <img
        className={gameImage}
        src={image}
        alt={alt}
      />
    )}
  </div>
);

export default GameImage;
