import './init';
import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent, ComponentTester } from 'aurelia-testing';
import { AbstractBindingRelayer, DocumentBinding } from 'base';

describe('Document binding', () => {

  let comp: ComponentTester<AbstractBindingRelayer>;

  it('works with plain attribute', async () => {

    comp = StageComponent
      .withResources([
        DocumentBinding as any
      ])
      .inView('<document-binding title="Hello world"></document-binding>')
      .boundTo({});

    await comp.create(bootstrap)

    expect(document.title).toBe('Hello world');

    await comp.dispose();
  });

  it('works with binding command', async () => {
    comp = StageComponent
      .withResources([
        DocumentBinding as any
      ])
      .inView(`<document-binding
        a.bind="message"
        b.one-time="message2"
        c.to-view="message3"></document-binding>`)
      .boundTo({ message: 'Hello world', message2: 'Ciao', message3: '👋' });

    await comp.create(bootstrap);

    expect(document['a']).toBe('Hello world');
    expect(document['b']).toBe('Ciao');
    expect(document['c']).toBe('👋');

    comp.dispose();
  });

  it('works with event', async () => {
    let clickCount = 0;
    comp = StageComponent
      .withResources([
        DocumentBinding as any
      ])
      .inView(`<document-binding
        click.trigger="click()"></document-binding>`)
      .boundTo({ click: () => clickCount++ });

    await comp.create(bootstrap);

    document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    expect(clickCount).toBe(1);
  });
});
