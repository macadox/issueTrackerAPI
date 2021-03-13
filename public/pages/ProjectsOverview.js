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

import { FaEdit } from 'react-icons/fa';

const url = `${window.location.origin}/api/v1/projects`;

const ProjectsOverview = () => {
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

  if (loading) {
    return (
      <main className="main main--loader">
        <Loader />;
      </main>
    );
  }

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
          <button className="btn btn--small btn--light align--right">
            Toggle grid view
          </button>
        </div>
        <div className="app__content">
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
              <ListHeader title="action" />
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

                return (
                  <ListRow key={id}>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        {prefix}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
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
                        to={`/projects/${id}/issues`}
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
                        to={`/projects/${id}/issues`}
                      >
                        {teamLead.name}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        {new Intl.DateTimeFormat('en-GB').format(deadlineDate)}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        {status}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        {progress}%
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        <AssigneeList max={3} users={teamMembers} />
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="list__content"
                        to={`/projects/${id}/issues`}
                      >
                        {numIssues}
                      </Link>
                    </ListDataElement>
                    <ListDataElement>
                      <Link
                        className="btn btn--icon btn--transparent"
                        to={`/projects/${id}/preview`}
                      >
                        <FaEdit />
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

export default ProjectsOverview;
