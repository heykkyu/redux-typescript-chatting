import GlobalBar from "../components/common/GlobalBar";
import ChatRowBox from "../components/chat/ChatRowBox"
import styled from "styled-components";

const Container = styled.div`
  animation: slideToRight .5s forwards;
`

const ChatList = () => {
  return (
    <Container>
      <GlobalBar
        type="list"
        title="채팅"
      />
      <ChatRowBox/>
    </Container>
  );
}

export default ChatList;
 