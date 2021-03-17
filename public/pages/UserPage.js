import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';

// Template fields
import Template from '../components/Template/Template';
import TemplateInput from '../components/Template/TemplateInput';
import TemplateSelect from '../components/Template/TemplateSelect';
import RoleMultiselect from '../components/Template/RoleMultiselect';
import TemplateImmutable from '../components/Template/TemplateImmutable';
import TemplateCheckbox from '../components/Template/TemplateCheckbox';

const editableFields = [
  { key: 'name', defaultVal: '' },
  { key: 'email', defaultVal: '' },
  { key: 'active', defaultVal: false },
  { key: 'organization', defaultVal: '' },
  { key: 'password', defaultVal: '' },
  { key: 'confirmPassword', defaultVal: '' },
  { key: 'roles', defaultVal: [] },
  { key: 'mainRole', defaultVal: '' },
];

const UserPage = () => {
  const { userId } = useParams();
  const [selectableRoles, setSelectableRoles] = useState([]);
  const url = userId ? `${window.location.origin}/api/v1/users/${userId}` : '';
  const { data, loading } = userId
    ? useFetch(url)
    : { data: {}, loading: false };

  useEffect(() => {
    if (data && Array.isArray(selectableRoles) && selectableRoles.length < 1) {
      setSelectableRoles(data.roles);
    }
  }, [data]);

  const updateRolesSelect = (roles) => {
    setSelectableRoles(roles);
  };

  if (loading) {
    return (
      <main className="main main--loader">
        <Loader />;
      </main>
    );
  }

  const getMode = () => {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  };
  const mode = getMode();

  return (
    <main className="main">
      <Breadcrumb
        crumbs={
          mode !== 'create'
            ? [{ label: 'ADMIN', url: '/admin' }, { label: `${data.name}` }]
            : [{ label: 'ADMIN', url: '/admin' }]
        }
      />
      <div className="wrapper--app">
        <h1 className="heading-title">{data && data.name}</h1>
        <div className="app__header">
          <Link className="btn btn--small btn--light" to="/admin">
            Back to admin panel
          </Link>
          {mode !== 'preview' ? (
            <>
              <Link
                className="btn btn--small btn--light align--right"
                to={
                  mode === 'create'
                    ? '/admin'
                    : mode === 'update'
                    ? `/admin/users/${userId}/preview`
                    : ''
                }
              >
                Cancel
              </Link>
              <button
                id="saveFormButton"
                form="userForm"
                type="submit"
                className="btn btn--small btn--light align--right"
              >
                Save user
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn--small btn--light align--right"
                to={`/admin/users/${userId}/update`}
              >
                Edit user
              </Link>
              <button
                id="deleteFormButton"
                form="userForm"
                type="submit"
                className="btn btn--small btn--light align--right"
              >
                Delete user
              </button>
            </>
          )}
        </div>
        <div className="app__content">
          <Template
            id="userForm"
            editableFields={editableFields}
            data={data}
            mode={mode}
            endpoint={`${window.location.origin}/api/v1/users`}
            saveRedirect={`/admin/users/:resourceId/preview`}
            deleteRedirect="/admin"
          >
            {data.createdOn && (
              <TemplateImmutable
                inputValue={new Intl.DateTimeFormat('en-GB').format(
                  new Date(data.createdOn)
                )}
                inputKey="createdOn"
                labelText="Created On"
              />
            )}
            <TemplateCheckbox
              inputValue={data && data.active}
              inputKey="active"
              labelText="Active"
            />
            <TemplateInput
              inputValue={data && data.name}
              inputKey="name"
              type="text"
              labelText="Name"
              className="newline"
            />
            <TemplateInput
              inputValue={data && data.email}
              inputKey="email"
              type="text"
              labelText="Email"
            />
            <TemplateInput
              inputValue={data && data.organization}
              inputKey="organization"
              type="text"
              labelText="Organization"
            />
            <TemplateInput
              inputValue={data && data.password}
              inputKey="password"
              type="password"
              labelText="Password"
              className="newline"
            />
            <TemplateInput
              inputValue={data && data.confirmPassword}
              inputKey="confirmPassword"
              type="password"
              labelText="Confirm Password"
            />
            <RoleMultiselect
              inputValue={data && data.roles}
              inputKey="roles"
              labelText="Roles"
              className="colspan2 newline"
              resource={[
                'developer',
                'designer',
                'product owner',
                'tester',
                'manager',
                'default',
                'admin',
              ]}
              onUpdate={updateRolesSelect}
            />
            <TemplateSelect
              inputValue={data && data.mainRole}
              inputKey="mainRole"
              labelText="Main Role"
              options={selectableRoles}
            />
          </Template>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
