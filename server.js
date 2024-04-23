import express from 'express';
import { exec } from 'child_process';


const app = express();


app.set('view engine', 'ejs');


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