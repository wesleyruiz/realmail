import { Liquid } from 'liquidjs';
import { chunk } from 'lodash';

export function renderWithData(html: string, data: Record<string, any>) {
  const engine = new Liquid();
  engine.plugin(function (L) {
    this.registerFilter('chunk', (x, num = 1) => chunk(x, num));
  });
  const tpl = engine.parse(html);
  return engine.renderSync(tpl, data);
}