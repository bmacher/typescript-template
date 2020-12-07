import { describe, it, expect } from '@jest/globals';
import { sayHelloWorld } from './index';

describe('sayHelloWorld', () => {
  it('should be definend', () => {
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
