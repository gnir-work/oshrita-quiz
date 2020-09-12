import React from 'react';
import {PageHeader, Button, Layout, Input, Card, message} from 'antd';
import './App.css';
import MyMapComponent from "./Map";
import {useState} from 'react';

import {Tabs} from 'antd';

const {TabPane} = Tabs;

const QUESTIONS = [
    {
        question: 'איפה נולדת?',
        answer: 'ישראל',
        location: {lat: -34.397, lng: 150.644},
        locationName: 'אמריקה'

    }, {
        question: 'מה השם שלך?',
        answer: 'ניר',
        location: {lat: 32.0668273, lng: 34.7630315},
        locationName: 'תל אביב'

    },
    {
        question: 'בן כמה אתה?',
        answer: '22',
        location: {lat: 31.7133867, lng: 35.092611517},
        locationName: 'צור הדסה'

    }
]

const TREASURE_LOCATION = {lat: 41.7133867, lng: 55.092611517};

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");

    const onAnswerSubmit = () => {
        if (currentAnswer === QUESTIONS[currentQuestion].answer) {
            message.success('תשובה נכונה!', 1);
            setTimeout(moveOnToNextQuestion, 1000);
        } else {
            message.error('טעות!', 1);
        }

    }

    const moveOnToNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAnswer("");
    }

    const onAnswerChange = (newAnswer) => {
        setCurrentAnswer(newAnswer.target.value);
    }

    const getQuestionTitle = (index) => (index <= currentQuestion ?
        `שאלה  ${index + 1} - ${QUESTIONS[index].locationName}` :
        `שאלה  ${index + 1} - ???`)

    return (
        <Layout stlye={{direction: "ltr"}}>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="מצא את המטמון"
                subTitle="בהצלחה בחיפוש הכי קשה בעולם"
            />
            <div className="App">

                {currentQuestion < QUESTIONS.length ? (
                    <>
                        <MyMapComponent isMarkerShown center={QUESTIONS[currentQuestion].location}/>

                        <Tabs activeKey={currentQuestion.toString()}>
                            {
                                QUESTIONS.map(({question}, index) => (
                                    <TabPane tab={getQuestionTitle(index)} key={index}>
                                        <Card style={{width: "40vw", margin: 'auto'}}>
                                            <h3> {question} </h3>
                                            <Input placeholder="תכניס את התשובה שלך פה..." onChange={onAnswerChange}
                                                   value={currentAnswer}/>
                                            <Button style={{marginTop: '1em'}} onClick={onAnswerSubmit}>
                                                הגש תשובה
                                            </Button>
                                        </Card>
                                    </TabPane>
                                ))
                            }
                        </Tabs>
                    </>
                ) : (
                    <>
                        <h1> מצאת את האוצר! </h1>
                        <MyMapComponent treasure isMarkerShown center={TREASURE_LOCATION}/>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default App;
