import styled from "styled-components";
import { useContextDispatch } from '../../moduels/context';

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
  const dispatch = useContextDispatch()
  const getFilteredPhoto = (value:number) => {
    const imgPath = require(`@/assets/img/img-send${value+1}.jpg`);
    return imgPath;
  }

  const sendImgMsg = (imgPath:string) => {
    const newChatId = new Date().getTime() as number;
    dispatch({ type: 'SEND_CHAT', message: {
      chat_id: newChatId,
      send_message: imgPath,
      send_message_type: "photo",
    }});

    setTimeout(() => {
      dispatch({ type: 'READ_SEND_MSG', chatId: newChatId});
    }, 3000)
  }

  return (
    <Container>
      {Array(7).fill(0).map((n, i) => {
        return (
          <img
            key={i} 
            src={getFilteredPhoto(i)} 
            onClick={() => sendImgMsg(getFilteredPhoto(i))}
            alt={`img${i}`}
          />
        )
      })}
    </Container>
  );
}

export default ChatImgBar;
 