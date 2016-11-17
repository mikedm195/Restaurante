import React from 'react';
import { Link, browserHistory } from 'react-router';

const Footer = () => (
    <footer className="container-fluid text-center">
        <p>Online Store Copyright</p>
        <form className="form-inline"><p>Get deals:</p>
            <input type="email" className="form-control" size="50" placeholder="Email Address" />
            <button type="button" className="btn btn-danger">Sign Up</button>
        </form>
    </footer>
);

export default Footer;

