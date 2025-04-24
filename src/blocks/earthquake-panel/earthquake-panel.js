import { Widget } from '../../lib/widget';

import './earthquake-panel.css';

class EarthquakePanel extends Widget {
  static _block = 'earthquake-panel';
  static _levelIcons = {
    2: 'fa-temperature-empty',
    4: 'fa-temperature-quarter',
    6: 'fa-temperature-half',
    8: 'fa-temperature-three-quarters',
    10: 'fa-temperature-full',
  };

  static iconTemplate({ magnitude }) {
    for (const level of Object.keys(this._levelIcons)) {
      const levelValue = Number(level);

      if (levelValue > magnitude) {
        return {
          block: 'i',
          cls: ['fa-solid', this._levelIcons[level]],
        };
      }
    }

    return undefined;
  }

  static template({ title, magnitude }) {
    return {
      block: 'div',
      cls: this.elem(),
      content: [{
        block: 'h2',
        cls: this.elem('title'),
        content: [
          this.iconTemplate({ magnitude }),
          title,
        ],
      }]
    }
  }

  constructor(container, { title, magnitude, tsunami, alert, coordinates }) {
    super(container);

    this.title = title;
    this.magnitude = magnitude;
    this.tsunami = tsunami;
    this.alert = alert;
    this.coordinates = coordinates;

    this.handleTitleClick = this.handleTitleClick.bind(this);

    this.render({
      title: this.title,
      magnitude: this.magnitude,
    });

    this.titleElem = this.widget.querySelector(EarthquakePanel.selector('title'));

    this.titleElem.addEventListener('click', this.handleTitleClick);
  }

  handleTitleClick() {
    this._trigger('framework:earthquake-panel:select', { ...this.coordinates });
  }
}

export { EarthquakePanel };
