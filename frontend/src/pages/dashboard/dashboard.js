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

    const [alerts, setAlerts] = useState([]);
    const [userLogged, setUserLogged] = useState([]);

    useEffect(() => {
        async function loadAlerts(){
            const response = await api.get('/allAlerts');
            //console.log(response);
            setAlerts(response.data.alerts);
        }

        loadAlerts();

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

    function clickLogout(){
        logout();
        history.push('/login');
    }

    return (
        <>
        <div className="container">
            <div className="header">
                <div className="left">Logado como: <b>{userLogged.name}</b> <span>({userLogged.email})</span></div>
                <div className="right"><Link to="/"><i class="fa fa-home"></i></Link> <Link to="/cadastro" to="/dashboard/newAlert"><i class="fa fa-plus-circle"></i></Link> <i onClick={() => clickLogout()} class="fa fa-power-off"></i></div>
            </div>
            <div className="box_alerts">
                <div className="title">Alertas <span>(total de {alerts.length} alertas)</span></div>
                <table>
                    <thead>
                        <tr>
                            <th>Títutlo</th>
                            <th>Conteúdo</th>
                            <th>Data</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map(alert => (
                            <tr key={alert._id}>
                                <td>{alert.title}</td>
                                <td>{alert.text}</td>
                                <td>{alert.date_exhibition}</td>
                                <td>{alert.user}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}