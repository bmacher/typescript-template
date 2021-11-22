import { sayHelloWorld } from './index';

describe('sayHelloWorld', () => {
  it('should be defined', () => {
    expect(sayHelloWorld).toBeDefined();
  });

  it('should print "Hello World!" on console', () => {
    const { info } = console;
    let catchedMsg = '';

    console.info = (msg: string) => {
      catchedMsg = msg;
    };

    sayHelloWorld();
    expect(catchedMsg).toBe('Hello World!');
    console.info = info;
  });
});
