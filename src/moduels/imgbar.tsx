import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type State = {
  showImgBar: boolean;
};

type Action =
  { type: 'HANDLE_IMAGE_BAR' };

type ImgBarDispatch = Dispatch<Action>;

const ImgBarStateContext = createContext<State | null>(null);
const ImgBarDispatchContext = createContext<ImgBarDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HANDLE_IMAGE_BAR':
      return {
        ...state,
        showImgBar: !state.showImgBar
      };
      
    default:
      throw new Error('error');
  }
}

export function ImgBarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    showImgBar: false
  });

  return (
    <ImgBarStateContext.Provider value={state}>
      <ImgBarDispatchContext.Provider value={dispatch}>
        {children}
      </ImgBarDispatchContext.Provider>
    </ImgBarStateContext.Provider>
  );
}

export function useImgBarState() {
  const state = useContext(ImgBarStateContext);
  if (!state) throw new Error('Error'); 
  return state;
}

export function useImgBarDispatch() {
  const dispatch = useContext(ImgBarDispatchContext);
  if (!dispatch) throw new Error('Error'); 
  return dispatch;
}