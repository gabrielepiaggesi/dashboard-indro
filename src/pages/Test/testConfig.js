export const testConfig = [
    {
        "label": "Difficolta Domanda",
        "key": "difficulty_level",
        "tag": "select",
        "options": [3,5,8,13]
    },
    {
        "label": "Domanda",
        "type": "text",
        "key": "question",
        "tag": "input",
        "placeholder": ""
    },
    {
        "label": "Testi Utili alla domanda",
        "type": "text",
        "key": "texts",
        "tag": "ul"
    },
    {
        "label": "1 Immagine Utile",
        "type": "file",
        "key": "file",
        "tag": "input"
    },
];


export const multipleType = [
    {
        "label": "Punti della Domanda",
        "key": "points",
        "tag": "select",
        "options": [3,5,8,13]
    },
    {
        "label": "Opzioni Risposte",
        "type": "options",
        "key": "options",
        "tag": "ul"
    },
    {
        "label": "Seleziona Risposta Esatta",
        "type": "radio",
        "key": "right_option",
        "tag": "select",
        "linkUl": 5
    },
    {
        "label": "Layout Risposte",
        "key": "layout",
        "tag": "select",
        "options": ["Lista", "Griglia"]
    }
];
