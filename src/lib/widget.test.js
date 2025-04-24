import { Widget } from "./widget";

test('[widget] elem() simple block', () => {
  Widget._block = 'test-block'

  expect(Widget.elem('test')).toBe('test-block__test');
});

test('[widget] elem() block with one mod', () => {
  Widget._block = 'test-block'

  expect(Widget.elem('test', ['theme'])).toBe('test-block__test test-block__test_theme');
});

test('[widget] elem() block with two mods', () => {
  Widget._block = 'test-block'

  expect(Widget.elem('test', ['theme', 'state'])).toBe('test-block__test test-block__test_theme test-block__test_state');
});

test('[widget] browserTemplateEngine renders string', () => {
  const result = Widget.browserTemplateEngine('test');

  expect(result.nodeType).toBe(3);
  expect(result.textContent).toBe('test');
});

test('[widget] browserTemplateEngine renders block', () => {
  const result = Widget.browserTemplateEngine({ block: 'div', content: 'test' });

  expect(result.nodeType).toBe(1);
  expect(result.tagName).toBe('DIV');
  expect(result.textContent).toBe('test');
});
