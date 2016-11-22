import React from 'react';
import { Link, browserHistory } from 'react-router';

const Team = () => (


<div className="container">

  <div className="row">
    <div className="col-lg-12">
      <h1 className="page-header">Quienes Somos
        <small>Conocenos</small>
      </h1>
      <p>Somos estudiantes de la clase de Ariel y no sencantaría tener 100 :)</p>
    </div>
  </div>

  <div className="row">
    <div className="col-lg-12">
      <h2 className="page-header">Nuestro equipo </h2>
    </div>
    <div className="col-lg-4 col-sm-6 text-center">
      <h3>Miguel del Moral
        <small>Mike</small>
      </h3>
    </div>
    <div className="col-lg-4 col-sm-6 text-center">
      <h3>Jacobo Calderón
        <small>kako</small>
      </h3>
    </div>
    <div className="col-lg-4 col-sm-6 text-center">
      <h3>Alejandro Herce
        <small>Herce</small>
      </h3>
    </div>
    <div className="col-lg-4 col-sm-6 text-center">
      <h3>Margot Duek
        <small>Margot</small>
      </h3>
    </div>
  </div>
</div>


);
/*
x(){
  const script = document.createElement("script");

  script.src ="js/jquery.js";
  script.src="js/bootstrap.min.js";

  document.body.appendChild(script);
}
*/
export default Team;
