import { Alert } from './Components/Alert';

const unload = (e) => {
  e.preventDefault();
  e.returnValue = 'Are you sure you want to leave?';
};

const removeBeforeUnload = () => {
  window.removeEventListener('beforeunload', unload);
};

export class FormTemplate {
  constructor(form) {
    this.form = form;
    this.optionalRoute = this.form.dataset.optionalroute
      ? this.form.dataset.optionalroute + '/'
      : '';
      this.redirectRoute = this.form.dataset.redirectroute
      ? this.form.dataset.redirectroute + '/'
      : this.optionalRoute;
    this.resource = this.form.dataset.resource;
    this.documentId = this.form.dataset.id;
    const deleteBtn = document.querySelector('#deleteFormBtn');

    if (/(\/update|\/create)$/.test(window.location.pathname)) {
      window.addEventListener('beforeunload', unload);
    }
    if (deleteBtn) {
      deleteBtn.addEventListener('click', this.deleteForm.bind(this));
    }
    this.form.addEventListener('submit', this.saveForm.bind(this));
  }

  async isParsable(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  async saveForm(e) {
    e.preventDefault();

    const bodyObj = {};
    const formData = new FormData(this.form);
    // Build body object
    for (let pair of formData.entries()) {
      if (await this.isParsable(pair[1])) {
        bodyObj[pair[0]] = JSON.parse(pair[1]);
      } else {
        if (pair[1] == '') continue;
        bodyObj[pair[0]] = pair[1];
      }
    }
    let args = [];
    if (/create$/gi.test(location.pathname)) {
      args = [this.resource, 'POST', bodyObj, this.optionalRoute];
    } else if (/update$/gi.test(location.pathname)) {
      args = [this.resource, 'PATCH', bodyObj, this.optionalRoute];
    } else {
      return new Alert('error', 'We do not cover that kind of request!');
    }
    console.log(bodyObj)
    removeBeforeUnload();
    await this.createReq(...args);
  }

  async createReq(resource, method, body, optionalRoute) {
    try {
      // window.location.protocol/{route = api/v1/}{optionalRoute = projects/:projectId/}{resource = issues}{documentId}
      const res = await fetch(
        `${window.location.protocol}/api/v1/${optionalRoute}${resource}/${this.documentId}`,
        {
          method: method,
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }
      new Alert('success', 'Data has been saved').showMessage();

      setTimeout(
        () =>
          location.assign(
            `${window.location.protocol}/${this.redirectRoute}${resource}/${resData.data.data._id}/preview`,
            3000
          ),
        2000
      );
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }

  async deleteForm() {
    //   Later add some custom delete
    const result = confirm('Do you really want to delete the form?');
    if (!result) return;
    removeBeforeUnload();
    try {
      const res = await fetch(
        `${window.location.protocol}/api/v1/${this.optionalRoute}${this.resource}/${this.documentId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }
      new Alert('success', 'Data successfully deleted').showMessage();

      setTimeout(
        () =>
          location.assign(
            `${window.location.protocol}/${this.redirectRoute}${this.resource}`,
            3000
          ),
        2000
      );
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }

  //   async makePostReq(resource, body) {
  //     try {
  //       const res = await fetch(
  //         `${window.location.protocol}/api/v1/${resource}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-type': 'application/json',
  //           },
  //           body: JSON.stringify(body),
  //         }
  //       );
  //       const resData = await res.json();
  //       console.log(resData);
  //       if (!res.ok) {
  //         return new Alert('error', resData.message).showMessage();
  //       }
  //       new Alert('success', 'Data has been saved').showMessage();

  //       setTimeout(
  //         () =>
  //           location.assign(
  //             `${window.location.protocol}/${resource}/${resData.data.data._id}/preview`,
  //             3000
  //           ),
  //         2000
  //       );
  //     } catch (err) {
  //       new Alert('error', err).showMessage();
  //     }
  //   }

  //   async makePatchReq(resource, body, id) {
  //     try {
  //       const res = await fetch(
  //         `${window.location.protocol}/api/v1/${resource}/${id}`,
  //         {
  //           method: 'PATCH',
  //           headers: {
  //             'Content-type': 'application/json',
  //           },
  //           body: JSON.stringify(body),
  //         }
  //       );
  //       const resData = await res.json();
  //       console.log(resData);
  //       if (!res.ok) {
  //         return new Alert('error', resData.message).showMessage();
  //       }
  //       new Alert('success', 'Data has been saved').showMessage();

  //       setTimeout(
  //         () =>
  //           location.assign(
  //             `${window.location.protocol}/${resource}/${resData.data.data._id}/preview`,
  //             3000
  //           ),
  //         2000
  //       );
  //     } catch (err) {
  //       new Alert('error', err).showMessage();
  //     }
  //   }
}
