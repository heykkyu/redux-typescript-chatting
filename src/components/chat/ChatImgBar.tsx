import React, {useEffect,useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  animation: slideToBtm .5s forwards;
  background-color: #5b36ac;
  height: 68px;
  padding: 11px 16px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  position: sticky;
  top: 44px;
  z-index: 1;
  img {
    width: 46px;
    height: 46px;
    border-radius: 5px;
    margin-right: 10px;
  }
`

const ChatImgBar = () => {
  const getFilteredPhoto = (value:number) => {
    const imgPath = require(`@/assets/img/img-send${value+1}.jpg`);
    return imgPath;
  }

  return (
    <Container>
      {Array(7).fill(0).map((n, i) => {
        return (
          <img key={i} src={getFilteredPhoto(i)} alt={`img${i}`} />
        )
      })}
    </Container>
  );
}

export default ChatImgBar;
 