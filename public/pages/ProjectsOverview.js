import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Breadcrumb from '../components/Breadcrumb';
import SearchBar from '../components/SearchBar';

import List from '../components/List/List';
import ListHead from '../components/List/ListHead';
import ListHeader from '../components/List/ListHeader';
import ListContent from '../components/List/ListContent';
import ListRow from '../components/List/ListRow';
import ListDataElement from '../components/List/ListDataElement';
import AssigneeList from '../components/AssigneeList';

const url = `${window.location.origin}/api/v1/projects`;

const ProjectsOverview = () => {
  const { data, loading } = useFetch(url);

  if (loading) {
    //   TODO
    return <div>Loading...</div>;
  }

//   console.log(data);

  return (
    <main className="main">
      <Breadcrumb></Breadcrumb>
      <div className="wrapper--app">
        <h1 className="heading-title">My projects</h1>
        <div className="app__header">
          <input type="text" className="search-input" />
        </div>
        <div className="app__content">
          <List>
            <ListHead>
              <ListHeader title="prefix" />
              <ListHeader title="project" />
              <ListHeader title="description" />
              <ListHeader title="project lead" />
              <ListHeader title="deadline" />
              <ListHeader title="status" />
              <ListHeader title="progress" />
              <ListHeader title="team members" />
              <ListHeader title="action" />
            </ListHead>
            <ListContent>
              {data.map((project) => {
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
                } = project;

                const nameLength = 35;
                const descriptionLength = 50;
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
                        {deadline}
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
                      ></Link>
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
