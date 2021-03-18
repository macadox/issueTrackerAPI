import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import SearchBar from '../components/SearchBar';

import List from '../components/List/List';
import ListHead from '../components/List/ListHead';
import ListHeader from '../components/List/ListHeader';
import ListContent from '../components/List/ListContent';
import ListRow from '../components/List/ListRow';
import ListDataElement from '../components/List/ListDataElement';
import AssigneeList from '../components/List/AssigneeList';

import Grid from '../components/Grid/Grid';
import Card from '../components/Grid/Card';
import CardHeader from '../components/Grid/CardHeader';
import CardBody from '../components/Grid/CardBody';
import CardFooter from '../components/Grid/CardFooter';
import CardLabel from '../components/Grid/CardLabel';
import CardTitle from '../components/Grid/CardTitle';
import CardDetail from '../components/Grid/CardDetail';

import { FaEdit } from 'react-icons/fa';
import bulb from 'url:../assets/img/ui/lightbulb.svg';
import clock from 'url:../assets/img/ui/wall-clock.svg';

const getLocalStorage = () => {
  let grid = localStorage.getItem('grid');
  if (grid) {
    return (grid = JSON.parse(localStorage.getItem('grid')));
  } else {
    return false;
  }
};

const IssuesOverview = () => {
  const { projectId } = useParams();
  const url = `${window.location.origin}/api/v1/projects/${projectId}/issues?limit=50`;

  const { data, loading } = useFetch(url);
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(null);
  const [isGrid, setIsGrid] = useState(getLocalStorage());

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

  useEffect(() => {
    localStorage.setItem('grid', isGrid);
  }, [isGrid]);

  if (loading) {
    return (
      <main className="main main--loader">
        <Loader />;
      </main>
    );
  }

  const renderListView = () => {
    return (
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
            const linkTo = `/projects/${projectId}/issues/${_id}/preview`;

            return (
              <ListRow key={_id}>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {issueId}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
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
                  <Link className="list__content" to={linkTo}>
                    {`${
                      description.length > descriptionLength
                        ? description.slice(0, descriptionLength) +
                          description.slice(descriptionLength).split(' ')[0] +
                          '...'
                        : description
                    }`}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {priority}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {author.name}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {new Intl.DateTimeFormat('en-GB').format(createdDate)}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {new Intl.DateTimeFormat('en-GB').format(deadlineDate)}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {status}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    <AssigneeList max={3} users={assignees} />
                  </Link>
                </ListDataElement>
              </ListRow>
            );
          })}
        </ListContent>
      </List>
    );
  };

  const renderGridView = () => {
    return (
      <Grid className="grid--issues">
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

          const descriptionLength = 120;
          const createdDate = new Date(createdOn);
          const deadlineDate = new Date(deadline);

          return (
            <Card className="card--issue" key={_id}>
              <CardHeader>
                <h4 className="card__prefix card__prefix--issue">{issueId}</h4>
                <Link
                  to={`/projects/${projectId}/issues/${_id}/preview`}
                  className="btn btn--icon btn--transparent align--right"
                >
                  <FaEdit />
                </Link>
              </CardHeader>
              <CardBody>
                <CardTitle title={name} />
                <CardDetail text={`Priority: ${priority}`} />
                <CardDetail text={`Author: ${author.name}`} />
                <CardDetail
                  text={`Description: ${
                    description.length > descriptionLength
                      ? description.slice(0, descriptionLength) +
                        description.slice(descriptionLength).split(' ')[0] +
                        '...'
                      : description
                  }`}
                />
                <CardDetail text={`Status: ${status}`} />
              </CardBody>
              <CardFooter>
                <CardLabel
                  icon={bulb}
                  iconAltText="created"
                  text={new Intl.DateTimeFormat('en-GB').format(createdDate)}
                />
                <CardLabel
                  icon={clock}
                  iconAltText="deadline"
                  text={new Intl.DateTimeFormat('en-GB').format(deadlineDate)}
                />
                <AssigneeList max={3} users={assignees} />
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    );
  };

  return (
    <main className="main">
      <Breadcrumb
        crumbs={[
          { label: 'PROJECTS', url: '/projects' },
          {
            label: `PROJECT`,
            url: `/projects/${projectId}/preview`,
          },
          { label: 'ISSUES', url: `/projects/${projectId}/issues` },
        ]}
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
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="btn btn--small btn--light align--right"
          >
            Toggle grid view
          </button>
        </div>
        <div className="app__content">
          {isGrid ? renderGridView() : renderListView()}
        </div>
      </div>
    </main>
  );
};

export default IssuesOverview;
