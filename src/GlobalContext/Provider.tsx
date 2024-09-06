'use client'
import { Provider } from "react-redux";
import { ReactNode } from "react";
import {Store} from './Store';
interface ReduxProviderProps{
    children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({children})=>{
    return(
        <Provider store={Store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider;