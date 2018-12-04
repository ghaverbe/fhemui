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
                    { id: 'O.01.Light.00', type: 'switch', name: 'Zentral', desc: 'Zentraler Lichtschalter' },
                    { id: 'O.01.Mode.01', type: 'push', name: 'Hauskreis', desc: '???' },
                    { id: 'O.01.Mode.02', type: 'push', name: 'Kino', desc: '???' },
                    { id: 'O.01.Mode.03', type: 'push', name: 'Aus', desc: 'Alles aus' },
                ]
            }]
        }, {
            id: 'O-01',
            name: 'Wohnzimmer',
            onload: 'show',
            groups: [{
                type: 'mode',
                divices: [
                    { id: 'O.01.Light.00', type: 'switch', name: 'Zentral', desc: 'Zentraler Lichtschalter' },
                    { id: 'O.01.Mode.01', type: 'push', name: 'Hauskreis', desc: '???' },
                    { id: 'O.01.Mode.02', type: 'push', name: 'Kino', desc: '???' },
                    { id: 'O.01.Mode.03', type: 'push', name: 'Aus', desc: 'Alles aus' },
                ]
            },{
                type: 'light',
                divices: [
                    { id: 'O.01.Light.01', type: 'switch', name: 'Stehlempe 1', desc: 'Stehlempe am Sofa' },
                    { id: 'O.01.Light.02', type: 'switch', name: 'Stehlempe 2', desc: 'Stehlempe am Fenster' }
                ]
            }, {
                type: 'heating',
                divices: [
                    { id: 'O.01.Climate.01', type: 'climate', name: 'Heizung', desc: 'Heizkörper am Henster' }
                ]
            }, {
                type: 'audio',
                divices: [
                    { id: 'O.01.Audio.01', type: 'audio', name: 'Volumio', desc: 'Audio' }
                ]
            }, {
                type: 'status',
                divices: [
                    { id: 'O.01.Light.00', type: 'j', name: 'Volumio', desc: 'Audio' }
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
        { id: 'O-03', name: 'Küche' },
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