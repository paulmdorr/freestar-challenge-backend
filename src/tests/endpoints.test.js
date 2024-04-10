import test from 'ava';
import app from '../app.js';
import request from 'supertest';
import { GAME_STATE } from '../game/game.js';

test.before(async (t) => {
  t.context.server = await app.listen(8888);
});

test('GET /', async (t) => {
  const res = await request(t.context.server).get('/');
  t.is(res.status, 200);
  t.is(res.text, 'The API is up and running!');
});

test('GET /game/start', async (t) => {
  const res = await request(t.context.server)
    .post('/game/start')
    .send({ playerName: 'Player 1' });
  t.is(res.status, 200);
  t.is(res.body.game.player.name, 'Player 1');
  t.is(res.body.game.player.hand.length, 2);
  t.is(res.body.game.dealer.hand.length, 2);
  t.is(res.body.game.deck.length, 48);
});

test('GET /game/hit', async (t) => {
  let { header, body } = await request(t.context.server)
    .post('/game/start')
    .send({ playerName: 'Player 1' });

  //The game could end on the first hit, so we need to loop until the game is not over
  while (body.game.state === GAME_STATE.GAME_OVER) {
    const gameRes = await request(t.context.server)
      .post('/game/start')
      .send({ playerName: 'Player 1' });
    header = gameRes.header;
    body = gameRes.body;
  }

  const res = await request(t.context.server)
    .post('/game/hit')
    .send({ playerName: 'Player 1' })
    .set('Cookie', [...header['set-cookie']]);

  t.is(res.status, 200);
  t.is(res.body.game.player.hand.length, 3);
});

test('GET /game/hold', async (t) => {
  let { header, body } = await request(t.context.server)
    .post('/game/start')
    .send({ playerName: 'Player 1' });

  //The game could end on the first hit, so we need to loop until the game is not over
  while (body.game.state === GAME_STATE.GAME_OVER) {
    const gameRes = await request(t.context.server)
      .post('/game/start')
      .send({ playerName: 'Player 1' });
    header = gameRes.header;
    body = gameRes.body;
  }

  const res = await request(t.context.server)
    .post('/game/hold')
    .send({ playerName: 'Player 1' })
    .set('Cookie', [...header['set-cookie']]);

  t.is(res.status, 200);
  t.is(res.body.game.state, GAME_STATE.GAME_OVER);
});

test.after((t) => {
  t.context.server.close();
});
