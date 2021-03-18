import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import CardProgressBar from '../components/Grid/CardProgressBar';
import CardLabel from '../components/Grid/CardLabel';
import CardTitle from '../components/Grid/CardTitle';
import CardDetail from '../components/Grid/CardDetail';

import { FaList } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import clock from 'url:../assets/img/ui/wall-clock.svg';

const url = `${window.location.origin}/api/v1/projects?limit=50`;

const getLocalStorage = () => {
  let grid = localStorage.getItem('grid');
  if (grid) {
    return (grid = JSON.parse(localStorage.getItem('grid')));
  } else {
    return false;
  }
};

const ProjectsOverview = () => {
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
        .filter((project) => regex.test(project.name))
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
      <List id="projects">
        <ListHead>
          <ListHeader
            onClick={sortColumn}
            sortKey="prefix"
            title="prefix"
            sort={sort}
          />
          <ListHeader
            onClick={sortColumn}
            sortKey="project"
            title="project"
            sort={sort}
          />
          <ListHeader
            onClick={sortColumn}
            sortKey="description"
            title="description"
            sort={sort}
          />
          <ListHeader title="project lead" />
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
          <ListHeader
            onClick={sortColumn}
            sortKey="progress"
            title="progress"
            sort={sort}
          />
          <ListHeader title="team members" />
          <ListHeader
            onClick={sortColumn}
            sortKey="numIssues"
            title="# Issues"
            sort={sort}
          />
          <ListHeader title="Issue List" />
        </ListHead>
        <ListContent>
          {filteredData.map((project) => {
            const {
              id,
              prefix,
              name,
              description,
              teamLead,
              deadline,
              status,
              progress,
              teamMembers,
              numIssues,
            } = project;

            const nameLength = 35;
            const descriptionLength = 50;
            const deadlineDate = new Date(deadline);
            const linkTo = `/projects/${id}/preview`;

            return (
              <ListRow key={id}>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {prefix}
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
                    {teamLead.name}
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
                    {progress}%
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    <AssigneeList max={3} users={teamMembers} />
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link className="list__content" to={linkTo}>
                    {numIssues}
                  </Link>
                </ListDataElement>
                <ListDataElement>
                  <Link
                    className="btn btn--icon btn--transparent"
                    to={`/projects/${id}/issues`}
                  >
                    <FaList />
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
      <Grid className="grid--projects">
        {filteredData.map((project) => {
          const {
            id,
            prefix,
            name,
            description,
            teamLead,
            deadline,
            status,
            progress,
            teamMembers,
            numIssues,
            icon,
          } = project;

          const descriptionLength = 120;
          const deadlineDate = new Date(deadline);

          return (
            <Card className="card--project" key={id}>
              <CardHeader>
                <img src={icon} alt={name} className="card__icon" />
                <h4 className="card__prefix">{prefix}</h4>
                <Link
                  to={`/projects/${id}/preview`}
                  className="btn btn--icon btn--transparent align--right"
                >
                  <FaEdit />
                </Link>
                <Link
                  to={`/projects/${id}/issues`}
                  className="btn btn--small btn--light align--right"
                >
                  Issues
                </Link>
              </CardHeader>
              <CardBody>
                <CardTitle title={name} />
                <CardDetail text={`Project Lead: ${teamLead.name}`} />
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
                <CardDetail text={`# Issues: ${numIssues}`} />
                <CardProgressBar progress={progress} />
              </CardBody>
              <CardFooter>
                <CardLabel
                  icon={clock}
                  iconAltText="deadline"
                  text={new Intl.DateTimeFormat('en-GB').format(deadlineDate)}
                />
                <AssigneeList max={4} users={teamMembers} />
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    );
  };

  return (
    <main className="main">
      <Breadcrumb crumbs={[{ label: 'PROJECTS' }]} />
      <div className="wrapper--app">
        <h1 className="heading-title">My projects</h1>
        <div className="app__header">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Type project name to search"
            controls="projects"
          />
          <Link
            className="btn btn--small btn--light align--right"
            to="/projects/create"
          >
            Create a new project
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

export default ProjectsOverview;
