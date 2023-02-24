let demo = [
    {
        "text": "task 1",
        "date": "2023-06-12",
        "description": "Souhaitez un joyeux anniversaire à Morgan"
    },
    {
        "text": "task 2",
        "date": "2023-06-21",
        "description": "Aller faire la fête pour la fête de la musique"
    },
    {
        "text": "123",
        "date": "",
        "description": ""
    }
  ];

  export function createDemonstration(array){
        // data.splice(0, data.length, ...Object.values(demo));    
        // data.splice(0,data.length, ...demo);
        array.push(...demo);
        localStorage.setItem("data", JSON.stringify(array));
  }