import { Checkbox } from './Checkbox';

class NestedTable {
  constructor(element) {
    this.element = element;
    this.input = this.element.querySelector('.input-hidden');
    this.table = this.element.querySelector('table');
    this.tbody = this.element.querySelector('tbody');
    this.trs = this.element.querySelectorAll(
      '.list__row--form:not(.list__row--heading)'
    );
    this.addNewBtn = this.element.querySelector('button');
    this.inputs = this.element.querySelectorAll(
      'input[type="text"], textarea, .checkbox'
    );

    this.values = [];

    this.init();
    console.log(this.values);
    this.inputs.forEach((input) =>
      input.addEventListener('input', this.handleInput.bind(this))
    );
    this.addNewBtn.addEventListener('click', this.addRow.bind(this));
  }

  init() {
    const vals = [];

    this.trs.forEach((row) => {
      const inputs = row.querySelectorAll(
        'input[type="text"], textarea, .checkbox'
      );
      const obj = {};
      inputs.forEach((input) => {
        // my custom checkbox
        if (input.getAttribute('role') == 'checkbox') {
          obj[input.dataset.key] = input.getAttribute('aria-checked') == 'true';
        } else {
          obj[input.dataset.key] = input.value;
        }
      });
      vals.push(obj);
    });
    this.values = [...vals];
    this.input.value = JSON.stringify(this.values);
  }

  updateThis() {
    this.trs = this.element.querySelectorAll(
      '.list__row--form:not(.list__row--heading)'
    );
  }

  handleInput(e) {
    const input = e.target;
    const tr = e.target.closest('tr');
    const index = [...this.trs].indexOf(tr);

    this.values[index][input.dataset.key] =
      input.getAttribute('role') == 'checkbox'
        ? input.getAttribute('aria-checked') == 'true'
        : input.value;
    console.log(this.values);
    this.input.value = JSON.stringify(this.values);
  }

  // 
  addRow() {

  }
}

class AcceptanceCriteriaTable extends NestedTable {
  constructor(element) {
    super(element);
  }

  addRow() {
    this.values.push({});
    const tr = document.createElement('tr');
    tr.className = 'list__row list__row--form';
    tr.innerHTML = `
        <td class="list__data list__data--form">
            <input class="form-template__input", type="text", aria-labelledby="criterionId", value="", data-key="_id", disabled>
        </td>
        <td class="list__data list__data--form list__data--textarea">
            <textarea class="form-template__textarea", aria-labelledby="criterionName", data-key='criterion'></textarea>
        </td>
        <td class="list__data list__data--form">
            <input class="form-template__input form-template__input--disabled" type="text" aria-labelledby="criterionCreated" value="" data-key="createdOn" disabled>
        </td>
        <td class="list__data list__data--form">
            <div class="checkbox", aria-labelledby="criterionSolved", checked, data-key='solved'></div>
        </td>
        <td class="list__data list__data--form list__data--delete">
            <button type="button" class="btn btn--small btn--light"><i class="fas fa-times"></i></button>
        </td>
    `;
    this.tbody.append(tr);

    const deleteBtn = tr.querySelector('button');
    const inputs = tr.querySelectorAll(
      'input[type="text"], textarea, .checkbox'
    );

    deleteBtn.addEventListener('click', () => {
      this.values.pop();
      this.tbody.removeChild(tr);
      this.updateThis();
      console.log(this.values);
      this.input.value = JSON.stringify(this.values);
    });
    inputs.forEach((input) => {
      if (input.classList.contains('checkbox')) {
        new Checkbox(input);
      }
      input.addEventListener('input', (e) => {
        this.handleInput.bind(this)(e);
      });
    });
    console.log(this.values);

    this.updateThis();
  }
}

export class NestedTableFactory {
  static dictionary = {
    AcceptanceCriteriaTable: AcceptanceCriteriaTable,
  };

  static create(T, element) {
    return new this.dictionary[T](element);
  }
}
