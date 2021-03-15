import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import Loader from '../Loader';

import List from '../List/List';
import ListHead from '../List/ListHead';
import ListHeader from '../List/ListHeader';
import ListContent from '../List/ListContent';
import ListRow from '../List/ListRow';
import ListDataElement from '../List/ListDataElement';

const UsersOverview = () => {
  const { projectId } = useParams();
  const url = `${window.location.origin}/api/v1/users`;

  const { data, loading } = useFetch(url);
  const [filteredData, setFilteredData] = useState(data);
  const [sort, setSort] = useState(null);

  const sortColumn = (sortKey) => {
    if (sort === `+${sortKey}`) {
      setSort(`-${sortKey}`);
    } else if (sort === `-${sortKey}`) {
      setSort(`+${sortKey}`);
    } else {
      setSort(`+${sortKey}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const sortedData = data.sort((a, b) => {
        if (sort) {
          const dir = sort.slice(0, 1);
          const sortKey = sort.slice(1);

          if (dir === '+') {
            if (b[sortKey] < a[sortKey]) return 1;
            else return -1;
          } else if (dir === '-') {
            if (b[sortKey] < a[sortKey]) return -1;
            else return 1;
          }
        }
      });
      setFilteredData(sortedData);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sort, data]);

  if (loading) {
    return (
      <main className="main main--loader">
        <Loader />;
      </main>
    );
  }

  return (
    <div className="wrapper--app">
      <div className="app__header">
        <Link
          className="btn btn--small btn--light align--right"
          to={`/admin/users/create`}
        >
          Add a new user
        </Link>
      </div>
      <div className="app__content">
        <List id="users">
          <ListHead>
            <ListHeader
              onClick={sortColumn}
              sortKey="name"
              title="Name"
              sort={sort}
            />
            <ListHeader
              onClick={sortColumn}
              sortKey="email"
              title="Email"
              sort={sort}
            />
            <ListHeader
              onClick={sortColumn}
              sortKey="organization"
              title="Organization"
              sort={sort}
            />
            <ListHeader
              onClick={sortColumn}
              sortKey="active"
              title="Active"
              sort={sort}
            />
            <ListHeader
              onClick={sortColumn}
              sortKey="mainRole"
              title="Main Role"
              sort={sort}
            />
            <ListHeader
              onClick={sortColumn}
              sortKey="createdOn"
              title="created"
              sort={sort}
            />
          </ListHead>
          <ListContent>
            {filteredData.map((issue) => {
              const {
                _id,
                name,
                email,
                organization,
                active,
                mainRole,
                createdOn,
              } = issue;

              const createdDate = new Date(createdOn);
              return (
                <ListRow key={_id}>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {name}
                    </Link>
                  </ListDataElement>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {email}
                    </Link>
                  </ListDataElement>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {organization}
                    </Link>
                  </ListDataElement>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {active ? 'true' : 'false'}
                    </Link>
                  </ListDataElement>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {mainRole}
                    </Link>
                  </ListDataElement>
                  <ListDataElement>
                    <Link
                      className="list__content"
                      to={`/admin/users/${_id}/preview`}
                    >
                      {new Intl.DateTimeFormat('en-GB').format(createdDate)}
                    </Link>
                  </ListDataElement>
                </ListRow>
              );
            })}
          </ListContent>
        </List>
      </div>
    </div>
  );
};

export default UsersOverview;
