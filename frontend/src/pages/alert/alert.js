import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import { useInterval } from '../../services/polling.js';
import $ from "jquery";

export default function Alert() {
    useEffect(() => {
        getAlert();
    }, []);

    function getAlert(){
        api.get('/alert')
        .then(function (response) {
          const data = response.data;
          if(data.count > 0){
            for(var i = 0; i < data.count; i++) {
              $("body").append('<div class="modal"><div class="box '+data.alerts[i].type+'"><div class="header"></div><div class="title">'+data.alerts[i].title+'</div><div class="text">'+data.alerts[i].text+'</div><div class="button">OK</div></div></div>');
            }
            $(".modal").each(function(){
              var modal_self = $(this);
              $(this).find(".button").click(function(){
                modal_self.fadeOut(200, function(){
                  modal_self.remove();
                });
              });
            });
          }
        });
    }  
      
    useInterval(() => {
        getAlert();
    }, 10000);

    return (
        <>
            <div className="App">
                Esperando um novo alerta!
            </div>
            <div className="admin">
              <Link to="/login"><i class="fa fa-unlock-alt"></i></Link>
            </div>
        </>
    );
}