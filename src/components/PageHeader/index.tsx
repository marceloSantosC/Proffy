import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';


import backicon from '../../assets/images/icons/back.svg';
import logoimg from '../../assets/images/logo.svg';

interface PageHeaderProps {
    tittle: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backicon} alt="Voltar"/>
                </Link>
                <img src={logoimg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.tittle}</strong>
                {props.children}
            </div>
        </header>


    );
}

export default PageHeader;