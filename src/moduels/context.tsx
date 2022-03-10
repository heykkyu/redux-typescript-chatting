import React, { useReducer, useContext, createContext, Dispatch } from 'react';
import {ChatListData, ChatViewData} from "../utils/dummyData";
import {getTimeToFull } from "../moduels/date"

type State = {
  showImgBar: boolean;
  currentUserId: number;
  currentUserName: string;
  chatList: ChatListDataType[];
  chatView: ChatViewDataType[];
};

type Action =
  | { type: 'HANDLE_IMAGE_BAR' }
  | { type: 'LOAD_CHAT_LIST' }
  | { type: 'LOAD_CHAT_VIEW' }
  | { type: 'SET_CURRENT_USER', id: number }
  | { type: 'SEND_CHAT', message: MessageType };

interface ChatListDataType {
  room_id: number,
  user_name: string,
  last_chat_comment: string,
  last_chat_time: string,
  profile_img_path: string,
  is_read: boolean,
  unread_cnt: number,
}

interface MessageType {
  send_message: string,
  send_message_type: string
}
export interface ChatViewDataType {
  chat_id: number,
  sender_type: string,
  send_message_type: string,
  send_message: string,
  send_time: string,
}

type ContextDispatch = Dispatch<Action>;

const ContextStateContext = createContext<State | null>(null);
const ContextDispatchContext = createContext<ContextDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUserId: action.id,
        currentUserName: ChatViewData.find((data) => data.room_id === action.id)?.user_name || "유저"
      };
      
    case 'LOAD_CHAT_LIST':
      return {
        ...state,
        chatList: ChatListData
      };

    case 'LOAD_CHAT_VIEW':
      return {
        ...state,
        chatView: ChatViewData.find((data) => data.room_id === state.currentUserId)?.chat_view || []
      };

    case 'SEND_CHAT':
      if (!action.message.send_message.trim()) {
        return state;
      } else {
        return {
          ...state,
          chatView: state.chatView.concat({
            chat_id: new Date().getTime() as number,
            sender_type: "admin",
            send_message_type: action.message.send_message_type,
            send_message: action.message.send_message,
            send_time: getTimeToFull(),
          })
        };
      }

    case 'HANDLE_IMAGE_BAR':
      return {
        ...state,
        showImgBar: !state.showImgBar
      };
      
    default:
      throw new Error('error');
  }
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    showImgBar: false,
    currentUserId: 0,
    currentUserName: "",
    chatList: [],
    chatView: []
  });

  return (
    <ContextStateContext.Provider value={state}>
      <ContextDispatchContext.Provider value={dispatch}>
        {children}
      </ContextDispatchContext.Provider>
    </ContextStateContext.Provider>
  );
}

export function useContextState() {
  const state = useContext(ContextStateContext);
  if (!state) throw new Error('Error'); 
  return state;
}

export function useContextDispatch() {
  const dispatch = useContext(ContextDispatchContext);
  if (!dispatch) throw new Error('Error'); 
  return dispatch;
}