import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';

// Template fields
import Template from '../components/Template/Template';
import TemplateInput from '../components/Template/TemplateInput';
import TemplateTextarea from '../components/Template/TemplateTextarea';
import TemplateSelect from '../components/Template/TemplateSelect';
import UserMultiselect from '../components/Template/UserMultiselect';
import TemplateDateInput from '../components/Template/TemplateDateInput';
import AcceptanceCriterias from '../components/Template/AcceptanceCriterias';
import TemplateImmutable from '../components/Template/TemplateImmutable';

const editableFields = [
  { key: 'status', defaultVal: 'New' },
  { key: 'name', defaultVal: '' },
  { key: 'priority', defaultVal: 'COULD' },
  { key: 'difficulty', defaultVal: 1 },
  { key: 'deadline', defaultVal: '' },
  { key: 'description', defaultVal: '' },
  { key: 'assignees', defaultVal: [] },
  { key: 'acceptanceCriterias', defaultVal: [] },
];

const IssuePage = () => {
  const getMode = () => {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  };
  const mode = getMode();

  const { projectId, issueId } = useParams();
  const url =
    projectId && issueId
      ? `${window.location.origin}/api/v1/projects/${projectId}/issues/${issueId}`
      : '';

  const { data, loading } =
    projectId && issueId ? useFetch(url) : { data: {}, loading: false };

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
                {
                  label: `PROJECT#${data.issueId.split('-')[0]}`,
                  url: `/projects/${projectId}/preview`,
                },
                { label: 'ISSUES', url: `/projects/${projectId}/issues` },
                { label: `ISSUE#${data.issueId}` },
              ]
            : [{ label: 'PROJECTS', url: '/projects' }]
          // TODO: Create breadcrumb
        }
      />
      <div className="wrapper--app">
        <h1 className="heading-title">{data && data.name}</h1>
        <div className="app__header">
          <Link
            className="btn btn--small btn--light"
            to={`/projects/${projectId}/issues`}
          >
            Back to issues
          </Link>
          {mode !== 'preview' ? (
            <>
              <Link
                className="btn btn--small btn--light align--right"
                to={
                  mode === 'create'
                    ? `/projects/${projectId}/issues`
                    : mode === 'update'
                    ? `/projects/${projectId}/issues/${issueId}/preview`
                    : ''
                }
              >
                Cancel
              </Link>
              <button
                id="saveFormButton"
                form="issueForm"
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
                to={`/projects/${projectId}/issues/${issueId}/update`}
              >
                Edit issue
              </Link>
              <button
                id="deleteFormButton"
                form="issueForm"
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
            id="issueForm"
            editableFields={editableFields}
            data={data}
            mode={mode}
            endpoint={`${window.location.origin}/api/v1/projects/${projectId}/issues`}
            saveRedirect={`/projects/${projectId}/issues/${issueId}/preview`}
            deleteRedirect={`/projects/${projectId}/issues`}
          >
            <TemplateImmutable
              inputValue={data && data.issueId}
              inputKey="issueId"
              labelText="ID"
            />
            <TemplateImmutable
              inputValue={data && data.author && data.author.name}
              inputKey="author"
              labelText="Issue Author"
            />
            <TemplateSelect
              inputValue={data && data.status}
              inputKey="status"
              labelText="Status"
              options={['New', 'In progress', 'Completed']}
            />
            <TemplateInput
              inputValue={data && data.name}
              inputKey="name"
              type="text"
              labelText="Name"
              className="newline"
            />
            <TemplateSelect
              inputValue={data && data.priority}
              inputKey="priority"
              labelText="Priority"
              options={['MUST', 'SHOULD', 'COULD', 'WONT']}
            />
            <TemplateInput
              inputValue={data && data.difficulty}
              inputKey="difficulty"
              type="number"
              labelText="Difficulty"
            />
            <TemplateDateInput
              inputValue={data && data.deadline}
              inputKey="deadline"
              labelText="Deadline"
            />
            <TemplateTextarea
              inputValue={data && data.description}
              inputKey="description"
              labelText="Description"
              className="colspan2"
            />
            <UserMultiselect
              inputValue={data && data.assignees}
              inputKey="assignees"
              labelText="Assignees"
              className="colspan2 newline"
            />
            <AcceptanceCriterias
              inputValue={data && data.acceptanceCriterias}
              inputKey="acceptanceCriterias"
              labelText="Acceptance Criterias"
              className="colspan3 newline"
            />
          </Template>
        </div>
      </div>
    </main>
  );
};

export default IssuePage;
