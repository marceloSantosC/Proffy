import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';

import './style.css';
import PageHeader from '../../components/PageHeader';
import TextArea from '../../components/TextArea';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState(''); 

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''},
    ]);

    const history = useHistory();

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
        scheduleItems.push();
    }

    function setScheduleItemValue(position: number, field: string, value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(position === index) {
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItems);
    }
    
    function handleCreateClass(event: FormEvent){
        event.preventDefault();
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert("Cadastro realizado com sucesso!");
            history.push('/');

        }).catch(() =>{
            alert("Erro no cadastro!");
        });
    }

    return (

        <div id="page-teacher-form" className="container">
            <PageHeader 
            tittle="Que incrível que você quer dar aulas." 
            description="O primeiro passo é preencher esse formulário de inscrição."/>
        
            <main>
            <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(event) => setName(event.target.value)} 
                        />
                        <Input
                            name="avatar" 
                            label="Avatar" 
                            value={avatar} 
                            onChange={(event) => setAvatar(event.target.value)} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp} 
                            onChange={(event) => setWhatsapp(event.target.value)} 
                        />
                        <TextArea 
                            name="bio"  
                            label="Biografia" 
                            value={bio} 
                            onChange={(event) => setBio(event.target.value)} 
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>Sobre a aula</legend>
                            <Select 
                                name="subject" 
                                label="Matéria" 
                                value={subject}
                                onChange={(event) => setSubject(event.target.value)} 
                                options={[
                                    { value:'Artes', label:'Artes' },
                                    { value:'Biologia', label:'Biologia' },
                                    { value:'Matemática', label:'Matemática' },
                                    { value:'Ciências', label:'Ciências' },
                                    { value:'Educação Física', label:'Educação Física' },
                                    { value:'Física', label:'Física' },
                                    { value:'Química', label:'Química' },
                                    { value:'Inglês', label:'Inglês' },
                                    { value:'Português', label:'Português' },
                                    { value:'História', label:'História' },
                                    { value:'Geografia', label:'Geografia' }
                                ]}
                            />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost}
                            onChange={(event) => setCost(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div className="schedule-item" key={scheduleItem.week_day}>
                                    <Select
                                        name="schedule"
                                        label="Horário"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)} 
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;