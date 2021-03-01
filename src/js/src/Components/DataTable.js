export class DataTable {
  constructor(element) {
    this.table = element;
    this.container = this.table.parentElement;
    this.wrap();

    this.ths = this.table.querySelectorAll('th');
    this.trs = this.table.querySelectorAll('tr');
    this.tds = this.table.querySelectorAll('td');
    this.cells = [...this.ths, ...this.tds];
    this.anchors = this.table.querySelectorAll('a');

    this.dataSearch = document.querySelector(
      `input[aria-controls="${this.table.id}"]`
    );
    this.initAria();
    this.anchors.forEach((anchor) => {
      anchor.setAttribute('tabindex', -1);
    });
    console.log(this.dataSearch);

    this.addSortingIcons();

    this.cells.forEach((cell) =>
      cell.addEventListener('click', this.handleClick.bind(this))
    );
    this.cells.forEach((cell) =>
      cell.addEventListener('keydown', this.handleKeyDown.bind(this))
    );
  }

  initAria() {
    this.table.setAttribute('role', 'grid');

    this.trs.forEach((tr) => tr.setAttribute('role', 'row'));
    this.ths.forEach((th, index) => {
      th.setAttribute('role', 'columnheader');
      th.setAttribute('tabindex', -1);
      th.setAttribute('aria-rowindex', 1);
      th.setAttribute('aria-colindex', index + 1);
      th.setAttribute('aria-sort', 'none');
    });
    this.tds.forEach((td, index) => {
      td.setAttribute('role', 'gridcell');
      td.setAttribute('tabindex', -1);
      td.setAttribute(
        'aria-rowindex',
        Math.ceil((index + 1) / this.ths.length) + 1
      );
      td.setAttribute('aria-colindex', (index % this.ths.length) + 1);
    });

    this.table.setAttribute('aria-colcount', this.ths.length);
    this.table.setAttribute('aria-rowcount', this.trs.length);

    if (this.table.hasAttribute('selected')) {
      this._selected = this.table.getAttribute('selected');
      this.cells[this._selected].setAttribute('tabindex', 0);
      this.cells[this._selected].setAttribute('aria-selected', true);
    } else {
      this._selected = 0;
      this.cells[0].setAttribute('tabindex', 0);
      this.cells[0].setAttribute('aria-selected', true);
    }
  }

  wrap() {
    //   Wrap table with DataTable Element
    this.dataTable = document.createElement('div');
    this.dataTable.className = 'datatable';
    this.dataTableFooter = document.createElement('div');
    this.dataTableFooter.className = 'datatable__footer';

    this.table.classList.add('datatable__content');

    this.container.removeChild(this.table);
    this.container.append(this.dataTable);

    this.dataTable.append(this.table, this.dataTableFooter);
  }

  handleClick(e) {
    const tar = e.target.closest('tr > *');
    const idx = [...this.cells].indexOf(tar);
    if (tar.tagName == 'TH' && tar.getAttribute('aria-selected') == 'true') {
      if (tar.dataset.sortable) {
        console.log('is sortable');
        this.handleSort(e);
      }
    }
    this.selected = idx;
  }

  handleKeyDown(e) {
    const colsNum = this.ths.length;
    const cellsNum = this.cells.length;

    switch (e.keyCode) {
      // left, top, right, bottom
      case 37: {
        e.preventDefault();
        if (this.selected % colsNum == 0) return;
        else this.selected--;
        break;
      }
      case 38: {
        e.preventDefault();
        if (this.selected < colsNum) return;
        else this.selected = this.selected - colsNum;
        break;
      }
      case 39: {
        e.preventDefault();
        if (this.selected % colsNum == colsNum - 1) return;
        else this.selected++;
        break;
      }
      case 40: {
        e.preventDefault();
        if (this.selected > cellsNum - colsNum - 1) return;
        else this.selected = this.selected + colsNum;
        break;
      }
      // Space, enter
      case 13:
      case 32: {
        e.preventDefault();
        const tar = e.target.closest('tr > *');
        const anchor = tar.querySelector('a');
        if (tar.tagName == 'TH') {
          if (e.target.dataset.sortable) {
            console.log('is sortable');
            this.handleSort(e);
          } else console.log('is not sortable');
        }
        if (anchor) {
          return this.openLink(anchor);
        }
        break;
      }
      // End, home
      case 35: {
        e.preventDefault();
        this.selected = cellsNum - 1;
        break;
      }
      case 36: {
        e.preventDefault();
        this.selected = 0;
        break;
      }
    }
  }

  openLink(anchor) {
    const href = anchor.getAttribute('href');
    if (!href) return;
    return window.location.assign(
      `${window.location.protocol}${href.startsWith('/') ? href : '/' + href}`
    );
  }

  handleSort(e) {
    console.log(e.target);
    const val = e.target.closest('th').dataset.sortval;
    console.log(val);
    const link = this.updateURLSortParameter(`${window.location.href}`, val);
    location.assign(`${link}`);
  }

  handleSearch() {
    console.log('data should be searched');
  }

  // URL?grid=true&sort=prefix,description
  updateURLSortParameter(url, paramVal, param) {
    let newAddURL = '',
      sortVals;
    const urlParts = url.split('?');
    const baseURL = urlParts[0];
    let additionalURL = urlParts[1];
    if (additionalURL) {
      const queryParts = additionalURL.split('&');
      // ["grid=true", "sort=description,name"]
      const sortQuery = queryParts.splice(
        queryParts.findIndex((part) => part.startsWith('sort')),
        1
      );
      console.log('query prts: ', queryParts);
      console.log('sortquer: ', sortQuery);
      if (sortQuery[0]) {
        const sortStringValue = sortQuery[0].split('=')[1];
        console.log('sortStringVal', sortStringValue);
        sortVals = sortStringValue.split(',');
        console.log('sortVals', sortVals);
        const regex = new RegExp(paramVal, 'g');
        const editedSortValue = sortVals.find((val) => regex.test(val));
        console.log('editedSortVal ', editedSortValue);
        if (!editedSortValue) {
          console.log('when nothing');
          sortVals.push(paramVal);
        } else {
          if (editedSortValue.startsWith('-')) {
            console.log('we are here when its -description');
            sortVals.splice(sortVals.indexOf(editedSortValue), 1);
          } else if (editedSortValue == paramVal) {
            console.log('we are here when its description');
            sortVals[sortVals.indexOf(editedSortValue)] = `-${paramVal}`;
          }
        }
      } else {
        sortVals.push(paramVal);
      }
      newAddURL = `?${queryParts
        .concat(`${sortVals.length > 0 ? 'sort=' : ''}${sortVals.join(',')}`)
        .join('&')}`;
    } else {
      newAddURL = `?sort=${paramVal}`;
    }
    return baseURL + newAddURL;
  }

  addSortingIcons() {
    const queryString = location.search.slice(1);
    const queryArr = queryString.split('&');
    const sortQuery = queryArr.find((query) => query.startsWith('sort'));

    if (!sortQuery) return;
    const sortString = sortQuery.split('=')[1];
    const sortArr = sortString.split(',');

    sortArr.forEach((val, index) => {
      let th, order;
      if (val.startsWith('-')) {
        val = val.slice(1);
        order = 'desc';
      } else {
        order = 'asc';
      }
      th = this.table.querySelector(`[data-sortval="${val}"]`);
      if (!th) return;
      const span = th.firstChild;
      const text = span.textContent;
      const icon =
        order === 'desc'
          ? `<img class="datatable-icon" src="/img/ui/sort-down.svg" alt="sort down">`
          : `<img class="datatable-icon" src="/img/ui/sort-ascending.svg" alt="sort up">`;
      span.innerHTML = `${text}
      ${icon}
      <span class="datatable-sort-order">${index + 1}</span>`;
    });
  }

  get selected() {
    return this._selected;
  }

  set selected(idx) {
    const previousSelected = this.cells[this.selected];
    previousSelected.setAttribute('tabindex', -1);
    previousSelected.removeAttribute('aria-selected');
    previousSelected.blur();

    const newSelected = this.cells[idx];
    newSelected.setAttribute('tabindex', 0);
    newSelected.setAttribute('aria-selected', true);
    newSelected.focus();
    this.table.setAttribute('selected', idx);
    this._selected = idx;
  }
}
