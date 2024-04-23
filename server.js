import express from 'express';
import { exec } from 'child_process';


const app = express();


app.set('view engine', 'ejs');


app.use(express.static('dist'));


app.get('/', (req, res) => {
  res.render('index', {});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  exec('open http://localhost:3000');
});

const getFeildForPath = (paths) => {
  let result = null;
  for (let i = paths.length - 1; i >= 0; i--) {
    result = data_1.find((item) => item.name === paths[i]);
    if (result) {
      break;
    }
  }
  return result;
};

const getParticipantsData = (participants) => {
  return participants.map((participant) => {
    const data = data_2.find((item) => item.logoId === participant.logo);
    if (!data) {
      return null;
    }
    return {
      role: participant.role,
      company: data.company,
      persons: participant.persons.reduce((acc, id) => {
        const person = data.persons.find((item) => item.id === id);
        if (person) {
          acc.push({
            name: person.name,
            position: person.position
          });
        }
        return acc;
      }, [])
    };
  });
};