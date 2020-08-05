import React from 'react';
import './style.css';

import whatsappicon from '../../assets/images/icons/whatsapp.svg';
import perfilproffy from '../../assets/images/perfil-proffy.jpg';

function TeacherItem(){
    return (
        <article className="teacher-item">
            <header>
                <img src={perfilproffy} alt="Imagem do proffy"/>
                <div>
                    <strong>Marcelo dos Santos</strong>
                    <span>Química</span>
                </div>
            </header>
            
            <p>
                Entusiasta das melhores tecnologias de química avançada.
                <br/><br/>
                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 100,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappicon} alt="whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;