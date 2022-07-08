export const quizConfig = [
    {
        "label": "Quiz Numero?",
        "type": "number",
        "key": "position_order",
        "tag": "input",
        "placeholder": "1"
    },
    {
        "label": "Argomanto Test",
        "type": "text",
        "key": "topic",
        "tag": "input",
        "placeholder": "Competenza 1"
    },
    {
        "label": "Quante domande ci sono",
        "type": "number",
        "key": "tests_amount",
        "tag": "input",
        "placeholder": "10"
    },
    {
        "label": "Punteggio Massimo del Quiz",
        "type": "number",
        "key": "tests_points",
        "tag": "input",
        "placeholder": "80"
    },
    {
        "label": "Minuti a disposizione",
        "key": "minutes",
        "tag": "select",
        "options": [5, 10, 15, 20, 25, 30, 40, 50, 60]
    },
    {
        "label": "Punteggio Difficolta",
        "key": "difficulty_level",
        "tag": "select",
        "options": [3, 5, 8, 13]
    },
    {
        "label": "Foto Random durante il Test",
        "type": "checkbox",
        "key": "check_camera",
        "tag": "input",
        "placeholder": "Webcam"
    },
    {
        "label": "Registrazioni Random durante il test",
        "type": "checkbox",
        "key": "check_mic",
        "tag": "input",
        "placeholder": "Mic"
    },
    {
        "label": "Quiz Privato?",
        "type": "checkbox",
        "key": "public",
        "tag": "input",
        "placeholder": "Si"
    }
];