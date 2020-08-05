import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { isAuthenticated, createLogin } from "../../services/auth";
import $ from "jquery";
import './dashboard.css';

export default function Login({history}) {
    useEffect(() => {
        if(isAuthenticated()){
            history.push('/dashboard');
        }
    }, []);

    const[login, setLogin] = useState('');
    const[password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        try {
            const response = await api.post("/sessions", { login, password });
            //console.log(response);
            createLogin(response.data._id);
            
            history.push('/dashboard');
        }
        catch(e){
            //console.log(e);
            $(".error").html("<div>Dados de login inválidos!</div>");
        }

    }

    return (
        <div className="login_container">
            <div className="box_login">
                <div className="header"></div>
                <div className="title">Entre na sua conta</div>
                <div className="error"></div>
                <form onSubmit={handleSubmit}>
                    <input 
                        required="required"
                        type="text" 
                        placeholder="Login" 
                        className="username"
                        value={login}
                        onChange={event => setLogin(event.target.value)}
                    />
                    <input 
                        required="required"
                        type="password" 
                        placeholder="*********" 
                        className="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <button className="button" type="submit">ENTRAR</button>
                </form>
            </div>
        </div>
    );
}