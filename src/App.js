import React from "react";
import { PageHeader, Button, Layout, Input, Card, message } from "antd";
import "./App.css";
import MyMapComponent from "./Map";
import { useState } from "react";

import { Tabs } from "antd";

const { TabPane } = Tabs;

const QUESTIONS = [
    {
        question: "הארץ שבה יש מגדל  נטוי?",
        answer: "איטליה",
        location: { lat: 43.722018, lng: 10.395695 },
        locationName: "פיזה-איטליה",
    },
    {
        question: "מהי הארץ הכי קרה בארצות הברית?",
        answer: "אלאסקה",
        location: { lat: 65.159312, lng: 152.319132 },
        locationName: "אלאסקה נהר יוקון ",
    },
    {
        question: "מאיזו ארץ הגיע המאכל אלפחורס?",
        answer: "ארגנטינה",
        location: { lat: -34.784857, lng: -58.44447 },
        locationName: "ארגנטינה, בואנוס איירס ",
    },
    {
        question: "מהי הארץ  השנייה הכי קטנה?",
        answer: "מונקו",
        location: { lat: 43.73494, lng: 7.4217 },
        locationName: "מונקו",
    },
    {
        question: "הארץ בה נמצא הספינקס",
        answer: "מצרים",
        location: { lat: 30.047286, lng: 31.238892 },
        locationName: "מצרים, קהיר",
    },
    {
        question: "הארץ מוצא של מלכת שווא?",
        answer: "אתיופיה",
        location: { lat: 8.96349, lng: 38.755129 },
        locationName: "אתיופיה, אדיס אבבה",
    },
    {
        question: "איזו ארץ קיימת רק 72 שנים?",
        answer: "ישראל",
        location: { lat: 31.780687, lng: 35.217958 },
        locationName: "ישראל",
    },
];

const TREASURE_LOCATION = { lat: 41.7133867, lng: 55.092611517 };

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");

    const onAnswerSubmit = () => {
        if (currentAnswer === QUESTIONS[currentQuestion].answer) {
            message.success("תשובה נכונה!", 1);
            setTimeout(moveOnToNextQuestion, 1000);
        } else {
            message.error("טעות!", 1);
        }
    };

    const moveOnToNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAnswer("");
    };

    const onAnswerChange = (newAnswer) => {
        setCurrentAnswer(newAnswer.target.value);
    };

    const getQuestionTitle = (index) =>
        index < currentQuestion
            ? `שאלה  ${index + 1} - ${QUESTIONS[index].locationName}`
            : `שאלה  ${index + 1} - ???`;

    return (
        <Layout stlye={{ direction: "ltr" }}>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="מצא את המטמון"
                subTitle="בהצלחה בחיפוש הכי קשה בעולם"
            />
            <div className="App">
                {currentQuestion < QUESTIONS.length ? (
                    <div className="game-content">
                        <Tabs
                            className="questions"
                            activeKey={currentQuestion.toString()}
                        >
                            {QUESTIONS.map(({ question }, index) => (
                                <TabPane
                                    tab={getQuestionTitle(index)}
                                    key={index}
                                >
                                    <Card
                                        style={{
                                            width: "40vw",
                                            margin: "auto",
                                        }}
                                    >
                                        <h3> {question} </h3>
                                        <Input
                                            onPressEnter={onAnswerSubmit}
                                            autoFocus
                                            placeholder="תכניס את התשובה שלך פה..."
                                            onChange={onAnswerChange}
                                            value={currentAnswer}
                                        />
                                        <Button
                                            style={{ marginTop: "1em" }}
                                            onClick={onAnswerSubmit}
                                        >
                                            הגש תשובה
                                        </Button>
                                    </Card>
                                </TabPane>
                            ))}
                        </Tabs>
                        <div style={{ width: "40vw" }}>
                            <MyMapComponent
                                isMarkerShown
                                center={QUESTIONS[currentQuestion].location}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <h1> מצאת את האוצר! </h1>
                        <MyMapComponent
                            treasure
                            isMarkerShown
                            center={TREASURE_LOCATION}
                        />
                    </>
                )}
            </div>
        </Layout>
    );
}

export default App;
