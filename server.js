import express from 'express';
const app = express();

app.use(express.static(__dirname + '/'));

app.get('*', (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080);

app.listen(port, () => {
	console.log('listening on port ', server.address().port);
});