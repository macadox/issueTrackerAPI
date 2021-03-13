import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';

// Template fields
import Template from '../components/Template/Template';
import TemplateInput from '../components/Template/TemplateInput';
import TemplateTextarea from '../components/Template/TemplateTextarea';
import TemplateSelect from '../components/Template/TemplateSelect';
import TemplateCheckbox from '../components/Template/TemplateCheckbox';
import UserMultiselect from '../components/Template/UserMultiselect';
import TemplateDateInput from '../components/Template/TemplateDateInput';
import TemplateTableInput from '../components/Template/TemplateTableInput';
import TemplateImmutable from '../components/Template/TemplateImmutable';

const editableFields = [
  { key: 'status', defaultVal: 'Not released' },
  { key: 'progress', defaultVal: 0 },
  { key: 'name', defaultVal: '' },
  { key: 'deadline', defaultVal: '' },
  { key: 'startDate', defaultVal: '' },
  { key: 'endDate', defaultVal: '' },
  { key: 'description', defaultVal: '' },
  { key: 'teamMembers', defaultVal: [] },
];

const ProjectPage = () => {
  const getMode = () => {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  };
  const mode = getMode();

  const { projectId } = useParams();
  const url = projectId
    ? `${window.location.origin}/api/v1/projects/${projectId}`
    : '';

  const { data, loading } = projectId
    ? useFetch(url)
    : { data: {}, loading: false };

  if (loading) {
    return (
      <main className="main main--loader">
        <Loader />;
      </main>
    );
  }

  return (
    <main className="main">
      <Breadcrumb
        crumbs={
          mode !== 'create'
            ? [
                { label: 'PROJECTS', url: '/projects' },
                { label: `PROJECT#${data.prefix}` },
              ]
            : [{ label: 'PROJECTS', url: '/projects' }]
        }
      />
      <div className="wrapper--app">
        <h1 className="heading-title">{data && data.name}</h1>
        <div className="app__header">
          <Link className="btn btn--small btn--light" to="/projects">
            Back to projects
          </Link>
          {mode !== 'preview' ? (
            <>
              <Link
                className="btn btn--small btn--light align--right"
                to={
                  mode === 'create'
                    ? '/projects'
                    : mode === 'update'
                    ? `/projects/${projectId}/preview`
                    : ''
                }
              >
                Cancel
              </Link>
              <button
                id="saveFormBtn"
                form="projectForm"
                type="submit"
                className="btn btn--small btn--light align--right"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn--small btn--light align--right"
                to={`/projects/${projectId}/issues/create`}
              >
                Submit a new issue
              </Link>
              <Link
                className="btn btn--small btn--light align--right"
                to={`/projects/${projectId}/issues`}
              >
                View issues list
              </Link>
              <Link
                className="btn btn--small btn--light align--right"
                to={`/projects/${projectId}/update`}
              >
                Edit project
              </Link>
              <button
                id="deleteFormButton"
                form="projectForm"
                type="submit"
                className="btn btn--small btn--light align--right"
              >
                Delete
              </button>
            </>
          )}
        </div>
        <div className="app__content">
          <Template
            id="projectForm"
            editableFields={editableFields}
            data={data}
            mode={mode}
            endpoint={`${window.location.origin}/api/v1/projects`}
            saveRedirect={`/projects/${projectId}/preview`}
            deleteRedirect="/projects"
          >
            <TemplateInput
              inputValue={data && data.prefix}
              inputKey="prefix"
              type="text"
              labelText="Prefix"
              readOnly={true}
            />
            <TemplateImmutable
              inputValue={data && data.teamLead && data.teamLead.name}
              inputKey="teamLead"
              labelText="Project Lead"
            />
            <TemplateSelect
              inputValue={data && data.status}
              inputKey="status"
              type="text"
              labelText="Status"
              options={['Not released', 'In progress', 'Testing', 'Released']}
            />
            <TemplateInput
              inputValue={data && data.progress}
              inputKey="progress"
              type="number"
              labelText="Progress"
            />
            <TemplateInput
              inputValue={data && data.name}
              inputKey="name"
              type="text"
              labelText="Name"
            />
            <TemplateDateInput
              inputValue={data && data.deadline}
              inputKey="deadline"
              labelText="Deadline"
            />
            <TemplateDateInput
              inputValue={data && data.startDate}
              inputKey="startDate"
              labelText="Start Date"
            />
            <TemplateDateInput
              inputValue={data && data.endDate}
              inputKey="endDate"
              labelText="End Date"
            />
            <TemplateTextarea
              inputValue={data && data.description}
              inputKey="description"
              labelText="Description"
              className="colspan2"
            />
            <UserMultiselect
              inputValue={data && data.teamMembers}
              inputKey="teamMembers"
              labelText="Team Members"
              className="colspan2 newline"
            />
          </Template>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
