module.exports = (app) => {
  app.get('/atendimentos', (req, res) => {
    res.send('olá atendimentos');
	});

  app.post('/atendimentos', (req, res) => {
		console.log(req.body);
    res.send('olá atendimentos POST');
  });
};
