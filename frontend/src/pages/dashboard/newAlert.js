import React, {useEffect, useState} from 'react';
import { isAuthenticated, getToken, logout } from "../../services/auth";
import { Link } from 'react-router-dom'
import api from '../../services/api.js';

export default function Dashboard({history}) {

    useEffect(() => {
        if(!isAuthenticated()){
            history.push('/login');
        }
    }, []);
    
    const[title, setTitle] = useState('');
    const[text, setText] = useState('');
    const[type, setType] = useState('normal');

    const [userLogged, setUserLogged] = useState([]);

    useEffect(() => {
        async function loadUserLogged(){
            const response = await api.get('/user', { 
                headers: {
                    user_id: getToken(),
                } 
            });
            setUserLogged(response.data);
        }
        loadUserLogged();
    }, []);

    async function handleSubmit(event){
        event.preventDefault();

        try {
            const user_id = getToken();
            const response = await api.post("/alert", { title, text, type }, {
                headers: {user_id}
            });
            //console.log(response);
            
            history.push('/dashboard');
        }
        catch(e){
            alert(e);
        }

    }

    function clickLogout(){
        logout();
        history.push('/login');
    }

    return (
        <>
        <div className="container">
            <div className="header">
                <div className="left">Logado como: <b>{userLogged.name}</b> <span>({userLogged.email})</span></div>
                <div className="right"><Link to="/"><i class="fa fa-home"></i></Link> <Link to="/dashboard"><i class="fa fa-list"></i></Link> <i onClick={() => clickLogout()} class="fa fa-power-off"></i></div>
            </div>
            <div className="box_alerts">
                <div className="title">Novo Alerta</div>
                <form onSubmit={handleSubmit}>
                    <input 
                        required="required"
                        type="text" 
                        placeholder="Título" 
                        className="title2"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                        placeholder="Texto" 
                        className="text"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                    <select value={type} onChange={event => setType(event.target.value)}>
                        <option value="normal">Cinza</option>
                        <option value="green">Verde</option>
                        <option value="red">Vermelho</option>
                    </select>
                    
                    <button className="button" type="submit">ENVIAR ALERTA</button>
                </form>
            </div>
        </div>
        </>
    );
}