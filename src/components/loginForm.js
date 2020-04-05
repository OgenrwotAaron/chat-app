import React,{ useState } from 'react';
import { VERIFY_USER } from '../Events'

const LoginForm = (props) => {

    let [nickname,setNickname]=useState("");
    let [error,setError]=useState("");

    const setUser=({user,isUser})=>{
        if(isUser){
            setError("Username taken");
        }else{
            props.createUser(user);
            setError();
        }
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        props.socket.emit(VERIFY_USER,nickname,setUser)
    }

    const inputChange=(event)=>{
        event.preventDefault();
        setNickname(event.target.value)
    }

    return ( 
        <div className="login">
            <form className="login-form" onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="nickname">
                    <h2>Got a nickname?</h2>
                </label>
                <input 
                    type="text" 
                    id="nickname"
                    placeholder="Cool Username"
                    value={nickname}
                    onChange={(e)=>{inputChange(e)}}/>
                <div className="error">
                    {error?error:null}
                </div>
            </form>
        </div>
     );
}
 
export default LoginForm;