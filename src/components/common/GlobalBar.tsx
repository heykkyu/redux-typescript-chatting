import React, { useState } from "react";
import styled from "styled-components";
import {ReactComponent as HamburgerSVG} from '../../assets/img/img-hamburger.svg'
import {ReactComponent as PersonSVG} from '../../assets/img/img-person.svg'
import {ReactComponent as BackSVG} from '../../assets/img/img-back.svg'
import {ReactComponent as PhotoSVG} from '../../assets/img/img-upload.svg'
import {ReactComponent as SearchSVG} from '../../assets/img/img-search.svg'
import { useNavigate } from "react-router-dom";
import { useImgBarState, useImgBarDispatch } from '../../moduels/imgbar';

const BarWrap = styled.div`
  background-color: #5b36ac;
  width: 100%;
  height: 44px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  > div {
    flex: 33%;
    padding: 0 12px;
  }
  svg {
    &:hover {
      cursor: pointer;
    }
  }
`
const BarLeft = styled.div`
  text-align: left;
`
const BarCenter = styled.div`
  text-align: center;
  p {
    font-size: 17px;
    letter-spacing: -0.12px;
    font-weight: bold;
  }
`
const BarRight = styled.div`
  text-align: right;
  * {
    margin-left: 15px;
  }
`

export interface propsType {
  type: string;
  title: string;
  setHandleImgBar?: () => void,
  handleImgBar?: boolean
}

const GlobalBar: React.FC<propsType> = ({type, title}) => {
  let navigate = useNavigate();
  const state = useImgBarState();
  const dispatch = useImgBarDispatch();
  const toggleImage = () => dispatch({ type: 'HANDLE_IMAGE_BAR' });

  const goBack = () => {
    navigate("/chat");
  }
  
  return (
    <BarWrap>
      <BarLeft>
        {type === 'list' && <HamburgerSVG /> }
        {(type === 'chat' && !state.showImgBar) && 
          <BackSVG onClick={() => goBack()}/> 
        }
      </BarLeft>
      <BarCenter>
        <p>{title}</p>
      </BarCenter>
      <BarRight>
        {type === 'list' ? 
          <PersonSVG /> 
          :
          <>
            <PhotoSVG onClick={toggleImage}/>
            <SearchSVG/>
          </>
        }
      </BarRight>
    </BarWrap>
  );
}

export default GlobalBar;
 