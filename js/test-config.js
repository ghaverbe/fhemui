const pref = {
    corlor: {
        background: "#336699",
        forground: "#336699",
        text: "#FFFFFF"
    }
}
const home = {
    name: 'MY.HOME (TEST)',
    floors: [{
        id: 'OG',
        name: 'Obergeschoss',
        onload: 'show',
        rooms: [{
            id: 'O-00',
            name: 'Obergeschoss',
            onload: '',
            groups: [{
                type: 'mode',
                divices: [
                    { id: 'O.00.Scene', type: 'push', name: 'Morgen', desc: '???', cmd: "set O.00.Scene scene morgen"},
                    { id: 'O.00.Scene', type: 'push', name: 'Abend', desc: '???', cmd: "set O.00.Scene scene abend"},
                    { id: 'O.00.Scene', type: 'push', name: 'Hauskreis', desc: '???', cmd: "set O.00.Scene scene hauskreis"},
                    { id: 'O.00.Scene', type: 'push', name: 'Kino', desc: '???', cmd: "set O.00.Scene scene kino"},
                    { id: 'O.00.Scene', type: 'push', name: 'Ein', desc: 'Schaltet alle Lampen ein', cmd: "set O.00.Scene scene an"},
                    { id: 'O.00.Scene', type: 'push', name: 'Aus', desc: 'Schaltet alle Lampen aus', cmd: "set O.00.Scene scene aus" }
                ]
            }]
        }, {
            name: 'Wohnzimmer',
            id: 'O-01',
            onload: 'show',
            groups: [{
                type: 'light',
                divices: [
                    { id: 'O.01.Light.00', type: 'switch', name: 'Zentral', desc: 'Zentraler Lichtschalter' },
                    { id: 'O.01.Light.01', type: 'switch', name: 'Stehlempe 1', desc: 'Stehlempe am Sofa' },
                    { id: 'O.01.Light.02', type: 'switch', name: 'Stehlempe 2', desc: 'Stehlempe am Fenster' }
                ]
            }, {
                type: 'heating',
                divices: [
                    { id: 'O.01.Clima.01', type: 'climate', name: 'Heizung', desc: 'Heizkörper am Fenster' }
                ]
            }, {
                type: 'audio',
                divices: [
                    { id: 'O.01.Audio.01', type: 'audio', name: 'Volumio', desc: 'Audio' }
                ]
            }, {
                type: 'status',
                divices: [
                    { id: 'O.01.Light.00', type: 'status', name: 'Volumio', desc: 'Audio' }
                ]
            }]
        }, {
            id: 'O-02',
            name: 'Esszimmer',
            divices: [
                { id: 'O.02.Licht.01', type: 'switch', name: 'Regel', desc: 'Deckenleuchte über dem Regal' },
                { id: 'O.02.Licht.02', type: 'switch', name: 'Tisch', desc: 'Deckenleuchte über dem Tisch' }
            ]
        },
        { id: 'O-03', 
        name: 'Küche', 
        groups: [{
            type: 'light',
            divices: [
                { id: 'O.03.Licht.1', type: 'switch', name: 'Arbeitsfläche', desc: 'Lampen unter dem Regal' },
                { id: 'O.03.Licht.2', type: 'switch', name: 'Deckenleuchte', desc: 'Deckenleuchten über dem Küchenblock' },
                { id: 'O.03.Licht', type: 'switch', name: 'Zentral', desc: 'Zentraler Lichtschalter' }
            ]
        }]
    },
        { id: 'O-04', name: 'Kammer' },
        { id: 'O-05', name: 'Gästezimmer' },
        { id: 'O-06', name: 'Das Zimmer' }
        ]
    },
    {
        id: 'DG',
        name: 'Dachgeschoss',
        rooms: [
            { id: 'D-01', name: 'Katharina' },
            { id: 'D-02', name: 'Christina' },
            { id: 'D-03', name: 'Sophia' },
            { id: 'D-04', name: 'Wäsche' },
            { id: 'D-05', name: 'Bad' },
            { id: 'D-06', name: 'Dusche' }
        ]
    }
    ]
}