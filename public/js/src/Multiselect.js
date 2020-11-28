class Multiselect {
  constructor(element) {
    this.element = element;
    this.element.setAttribute('tabindex', 0);

    this.chosenContainer = this.element.querySelector('.chosen--edit');
    this.dropdown = this.element.querySelector('.dropdown');
    this.input = this.element.querySelector('.chosen__hidden-input');

    this.values = [];
    this._active = 0;
    this.element.setAttribute(
      'aria-activedescendant',
      [...this.dropdown.children][this._active].id
    );
    [...this.dropdown.children][this._active].classList.add(
      'dropdown__option--focused'
    );

    this.init();

    this.element.addEventListener('focus', this.focusFirst.bind(this));
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  init() {
    [...this.dropdown.children].forEach((option) => {
      if (
        [...this.chosenContainer.querySelectorAll('.chosen__choice')]
          .map((choice) => choice.dataset.id)
          .includes(option.dataset.id)
      ) {
        this.dropdown.removeChild(option);
      }
    });

    this.values = [...this.chosenContainer.children].map(
      (chosen) => chosen.dataset.id
    );
  }

  focusFirst() {
    if (this.dropdown.children.length == 0) return;
    this.active = 0;
    [...this.dropdown.children][this._active].classList.add(
      'dropdown__option--focused'
    );
  }

  // filterList() {
  //   const query = this.searchInput.value.trim();
  //   const regex = new RegExp(query, 'gi');
  //   console.log(query);

  //   [...this.dropdown.children].forEach((option) => {
  //     if (!regex.test(option.firstChild.textContent)) {
  //       option.classList.add('dropdown__option--hidden');
  //     } else {
  //       option.classList.remove('dropdown__option--hidden');
  //     }
  //   });
  // }

  handleKeyDown(e) {
    // backspace
    if (e.keyCode == 8) {
      e.preventDefault();
      if (this.chosenContainer.children.length == 0) return;
      this.removeValue(
        this.chosenContainer.children[this.chosenContainer.children.length - 1]
      );
      this.focusFirst();
    } // arrowup
    else if (e.keyCode == 38) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      if (this.active == 0) return;
      else this.active--;
    } // arrowdown
    else if (e.keyCode == 40) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      if (this.active == this.dropdown.children.length - 1) return;
      else this.active++;
    } // space enter
    else if (e.keyCode == 13 || e.keyCode == 32) {
      e.preventDefault();
      if (this.dropdown.children.length == 0) return;
      this.selectValue(this.dropdown.children[this.active]);
      this.focusFirst();
    } // alphanumeric inputs
  }

  handleClick(e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (li.classList.contains('dropdown__option')) {
      this.selectValue(li);
    } else if (li.classList.contains('chosen__choice--edit')) {
      if (!e.target.closest('.chosen__button')) return;
      this.removeValue(li);
    }
  }

  selectValue(li) {
    this.dropdown.removeChild(li);
    this.chosenContainer.append(this.transformToChoice(li));
    this.values.push(li.dataset.id);
    this.input.value = JSON.stringify(this.values);
    console.log(this.input.value)
  }

  removeValue(li) {
    this.chosenContainer.removeChild(li);
    this.dropdown.append(this.transformToOption(li));

    this.values.splice(this.values.indexOf(li.dataset.id), 1);
    this.input.value = JSON.stringify(this.values);
    console.log(this.input.value)
    // Sort (only for dropdown)
    // [...this.dropdown.children].sort((option1, option2) =>{
    //   console
    //   return option1.querySelector('span').textContent <
    //   option2.querySelector('span').textContent
    //     ? -1
    //     : 1}
    // );
  }

  get active() {
    return this._active;
  }

  set active(idx) {
    const oldOption = document.getElementById(
      this.element.getAttribute('aria-activedescendant')
    );
    const newOption = [...this.dropdown.children][idx];

    this.element.setAttribute('aria-activedescendant', newOption.id);
    this._active = idx;

    newOption.classList.add('dropdown__option--focused');
    oldOption.classList.remove('dropdown__option--focused');
  }
}

class UserMultiselect extends Multiselect {
  constructor(element) {
    super(element);
  }

  transformToOption(el) {
    const span = el.querySelector('span');
    const icon = el.querySelector('.chosen__button');

    el.className = 'dropdown__option';
    span.className = 'dropdown__value';
    icon.className = 'chosen__button chosen__button--hidden';

    el.setAttribute('aria-selected', 'false');

    return el;
  }

  transformToChoice(el) {
    const span = el.querySelector('span');
    const icon = el.querySelector('.chosen__button');

    el.className = 'chosen__choice chosen__choice--edit';
    span.className = 'chosen__value';
    icon.className = 'chosen__button';

    el.setAttribute('aria-selected', 'true');

    return el;
  }

  // async getResources() {
  //   const users = await this.fetchUsers();
  //   this.options = users
  //     .filter((user) => {
  //       return !this.valuess.map((li) => li.dataset.id).includes(user._id);
  //     })
  //     .map((user) => {
  //       const dropdownOption = document.createElement('div');
  //       dropdownOption.className = 'dropdown__option';
  //       dropdownOption.setAttribute('role', 'option');
  //       dropdownOption.setAttribute('aria-selected', 'false');
  //       const dropdownValue = document.createElement('span');
  //       dropdownValue.className = 'dropdown__value';
  //       dropdownValue.textContent = `${user.name} (${user.mainRole})`;
  //       dropdownOption.append(dropdownValue);

  //       return dropdownOption;
  //     });
  //   this.display();
  // }

  // async fetchUsers() {
  //   try {
  //     const res = await fetch(
  //       `${window.location.protocol}/api/v1/users?limit=100`
  //     );
  //     const resData = await res.json();

  //     return resData.data.data;
  //   } catch (err) {}
  // }
  // fetching data for the resource
}

export class MultiselectFactory {
  static dictionary = {
    UserMultiselect: UserMultiselect,
  };

  static create(T, element) {
    return new this.dictionary[T](element);
  }
}
