export class TabbedInterface {
  constructor(element) {
    this.tabList = element.querySelector('.tabs__tablist');
    this.tabButtons = this.tabList.querySelectorAll('.tabs__tab');
    this.tabPanels = element.querySelectorAll('.tabs__tabpanel');
    this._active = 0;

    // Init tablist vith values
    this.init();
    // Event listeners for keydown and mouseclick
    this.tabButtons.forEach((button) => {
      button.addEventListener('click', this.handleClick.bind(this));
    });
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');
    this.tabList.setAttribute('aria-orientation', 'vertical')

    this.tabButtons.forEach((tab, index) => {
      if (index == 0) {
        tab.classList.add('tabs__tab--active');
      }

      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `panel_${index}`);
      tab.id = `tab_${index}`;
    });

    this.tabPanels.forEach((panel, index) => {
      if (index == 0) {
        panel.setAttribute('aria-selected', true);
        panel.classList.add('tabs__tabpanel--active');
      } else {
        panel.setAttribute('aria-selected', false);
      }

      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab_${index}`);
      panel.id = `panel_${index}`;
    });
  }

  handleClick(e) {
    const button = e.target.closest('button');
    const index = [...this.tabButtons].indexOf(button);
    
    this.active = index
  }

  get active() {
    return this._active;
  }

  set active(val) {
    const oldActivePanel = this.tabPanels[this.active];
    const oldActiveButton = this.tabButtons[this.active];

    const newActivePanel = this.tabPanels[val];
    const newActiveButton = this.tabButtons[val];

    // Change oldActive selected to false
    oldActivePanel.setAttribute('aria-selected', false);
    oldActivePanel.classList.remove('tabs__tabpanel--active');
    oldActiveButton.classList.remove('tabs__tab--active');
    // Change newActive selected to true
    newActivePanel.setAttribute('aria-selected', true);
    newActivePanel.classList.add('tabs__tabpanel--active');
    newActiveButton.classList.add('tabs__tab--active');

    this._active = val;
  }
}
