import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import { exec } from 'child_process';


const app = express();


app.set('view engine', 'ejs');


const structure = yaml.load(fs.readFileSync('structure.yaml', 'utf8'))?.ar?.ru;
const data_1 = yaml.load(fs.readFileSync('data/data_1.yaml', 'utf8'))?.data;
const data_2 = yaml.load(fs.readFileSync('data/data_2.yaml', 'utf8'))?.data;


app.use(express.static('dist'));


app.get('/api/*', (req, res) => {
  const paths = req.path.split('/').filter(Boolean).slice(1);

  const data = getFeildForPath(paths);

  if (!data) {
    res.status(404).send('Not found');
    return;
  }

  const participants = getParticipantsData(data.participants);
  res.json({
    organizations: data.organizations, 
    participants: participants
  });
});


app.get('/*', (req, res) => {
  if (!structure) {
    res.status(404).send('Not found');
    return;
  }
  res.render('index', { structure: structure });
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
  const getPersonsData = (data, participant) => {
    return participant.persons.map((person) => {
      const personData = data.persons.find((item) => item.id === person);
      if (!personData) {
        return null;
      }
      return {
        name: personData.name,
        position: personData.position
      };
    });
  }

  return participants.map((participant) => {
    if (!participant?.logo) {
      return null;
    }
    const data = data_2.find((item) => item.logoId === participant.logo);
    if (!data) {
      return null;
    }
    const result = {};
    if (participant.role) {
      result.role = participant.role;
    }
    if (data.company) {
      result.company = data.company;
    }
    if (participant.persons) {
      result.persons = getPersonsData(data, participant);
    }
    return result;
  });
};