import styled from "styled-components";
import {ChatListData} from "../../utils/dummyData"
import { useNavigate } from "react-router-dom";

const RowWhole = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 15px;
  box-sizing: border-box;
`
const RowLeft = styled.div`
  max-width: 56px;
  min-width: 56px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`
const RowCenter = styled.div`
  text-align: left;
  flex: 1 auto;
  max-width: calc(100% - 130px);
  p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-weight: bold;
    margin: 5px 0;
    &:nth-child(1) {
      font-size: 16px;
      letter-spacing: -0.2px;
      color: #464052;
    }
    &:nth-child(2) {
      font-size: 13px;
      letter-spacing: -0.1px;
      color: #a4a6b0;
    }
  }
`
const RowRight = styled.div`
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 5px;
    &:nth-child(1) {
      font-size: 11px;
      font-weight: bold;
      color: #363a42;
      opacity: .4;
    }
    &:nth-child(2) {
      font-size: 10px;
      letter-spacing: -0.08px;
      color: #fff;
      background-color: #5b36ac;
      border-radius: 50%;
      width:18px;
      height: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center; 
    }
  }
`
  

interface ChatListDataType {
  room_id: number,
  user_name: string,
  last_chat_comment: string,
  last_chat_time: string,
  profile_img_path: string,
  is_read: boolean,
  unread_cnt: number,
}

const ChatRowBox = () => {

  let navigate = useNavigate();
  
  const goChatRoom = (room_id: number) => {
    navigate(`/room/${room_id}`);
  }

  const getFilteredDate = (value:string) => {
    return value.substring(11,16);
  }

  const getFilteredPhoto = (value:number) => {
    const imgPath = require(`@/assets/img/img-profile${value}.jpg`);
    return imgPath;
  }

  return (
    <>
      {ChatListData.map((chat:ChatListDataType) => {
        return (
          <RowWhole
            key={chat.room_id}
            onClick={() => goChatRoom(chat.room_id)}
          >
            <RowLeft>
              <img src={getFilteredPhoto(chat.room_id)} alt={`profile${chat.room_id}`} />
            </RowLeft>
            <RowCenter>
              <p>{chat.user_name}</p>
              <p>{chat.last_chat_comment}</p>
            </RowCenter>
            <RowRight>
              <p>{getFilteredDate(chat.last_chat_time)}</p>
              {chat.is_read === false && (
                <p>
                  <span>{chat.unread_cnt}</span>
                </p>
              )} 
            </RowRight>
          </RowWhole>
        )
      })}
    </>
  );
}

export default ChatRowBox;
 