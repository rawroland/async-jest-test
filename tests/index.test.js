const builder = require('botbuilder');
const connector = new builder.ConsoleConnector();
const dialog = (session, results, next) => {
  session.send('Correct message');
};

let bot;
beforeEach(() => {
  bot = new builder.UniversalBot(connector);
  bot.dialog('/', dialog);
});

afterEach(() => {
  bot = null;
});

test('async code runs successfully if the assertion passes', done => {
  bot.on('send', message => {
    expect(message.text).toBe('Correct message');
    done();
  });
  connector.processMessage('Start');
});

test('async code fails unexpectedly with a timeout if the assertion fails', done => {
  bot.on('send', message => {
    expect(message.text).toBe('Wrong message');
    done();
  });
  connector.processMessage('Start');
});

test('async code fails as expected if the assertion is wrapped in a try catch block', done => {
  bot.on('send', message => {
    try {
      expect(message.text).toBe('Wrong message');
      done();
    } catch (error) {
      done.fail(error);
    }
  });
  connector.processMessage('Start');
});
