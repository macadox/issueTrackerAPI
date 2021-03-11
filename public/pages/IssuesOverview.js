import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Breadcrumb from '../components/Breadcrumb';
import SearchBar from '../components/SearchBar';

import List from '../components/List/List';
import ListHead from '../components/List/ListHead';
import ListHeader from '../components/List/ListHeader';
import ListContent from '../components/List/ListContent';
import ListRow from '../components/List/ListRow';
import ListDataElement from '../components/List/ListDataElement';
import AssigneeList from '../components/List/AssigneeList';

const IssuesOverview = () => {
  const { projectId } = useParams();
  const url = `${window.location.origin}/api/v1/projects/${projectId}/issues`;

  const { data, loading } = useFetch(url);
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState('');
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
      const regex = new RegExp(search, 'gi');
      const filteredData = data
        .filter((issue) => regex.test(issue.name))
        .sort((a, b) => {
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
      setFilteredData(filteredData);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, sort, data]);

  if (loading) {
    //   TODO
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      <Breadcrumb
        crumbs={[{ label: 'PROJECTS', url: '/projects' }, { label: 'ISSUES' }]}
      />
      <div className="wrapper--app">
        <h1 className="heading-title">Issue list</h1>
        <div className="app__header">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Type issue name to search"
            controls="issues"
          />
          <Link
            className="btn btn--small btn--light align--right"
            to={`/projects/${projectId}/issues/create`}
          >
            Submit a new issue
          </Link>
          <Link
            className="btn btn--small btn--light align--right"
            to={`/projects/${projectId}/preview`}
          >
            Project details
          </Link>
          <button className="btn btn--small btn--light align--right">
            Toggle grid view
          </button>
        </div>
        <div className="app__content">
          <List id="issues">
            <ListHead>
              <ListHeader
                onClick={sortColumn}
                sortKey="issueId"
                title="ID"
                sort={sort}
              />
              <ListHeader
                onClick={sortColumn}
                sortKey="name"
                title="Issue"
                sort={sort}
              />
              <ListHeader
                onClick={sortColumn}
                sortKey="description"
                title="Description"
                sort={sort}
              />
              <ListHeader
                onClick={sortColumn}
                sortKey="priority"
                title="priority"
                sort={sort}
              />
              <ListHeader title="author" />
              <ListHeader
                onClick={sortColumn}
                sortKey="createdOn"
                title="created"
                sort={sort}
              />
              <ListHeader
                onClick={sortColumn}
                sortKey="deadline"
                title="deadline"
                sort={sort}
              />
              <ListHeader
                onClick={sortColumn}
                sortKey="status"
                title="status"
                sort={sort}
              />
              <ListHeader title="Assignees" />
            </ListHead>
            <ListContent>
              {filteredData.map((issue) => {
                const {
                  issueId,
                  _id,
                  name,
                  description,
                  author,
                  deadline,
                  priority,
                  status,
                  createdOn,
                  assignees,
                } = issue;

                const nameLength = 35;
                const descriptionLength = 50;
                const createdDate = new Date(createdOn);
                const deadlineDate = new Date(deadline);

                return (
                  <ListRow key={_id}>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {issueId}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {`${
                          name.length > nameLength
                            ? name.slice(0, nameLength) +
                              name.slice(nameLength).split(' ')[0] +
                              '...'
                            : name
                        }`}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {`${
                          description.length > descriptionLength
                            ? description.slice(0, descriptionLength) +
                              description
                                .slice(descriptionLength)
                                .split(' ')[0] +
                              '...'
                            : description
                        }`}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {priority}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {author.name}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {new Intl.DateTimeFormat('en-GB').format(createdDate)}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {new Intl.DateTimeFormat('en-GB').format(deadlineDate)}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        {status}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${projectId}/issues/${_id}/preview`}
                      >
                        <AssigneeList max={3} users={assignees} />
                      </Link>
                    </ListDataElement>
                  </ListRow>
                );
              })}
            </ListContent>
          </List>
        </div>
      </div>
    </main>
  );
};

export default IssuesOverview;
