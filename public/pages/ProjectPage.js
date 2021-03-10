import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

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
  'status',
  'progress',
  'name',
  'deadline',
  'startDate',
  'endDate',
  'description',
  'teamMembers',
];

const ProjectPage = ({ ...props }) => {
  const { projectId } = useParams();
  const url = `${window.location.origin}/api/v1/projects/${projectId}`;
  const { data, loading } = useFetch(url);

  const getMode = () => {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  };
  const mode = getMode();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      {/* <Breadcrumb crumbs={} /> */}
      <div className="wrapper-app">
        <h1 className="heading-title">{data.name}</h1>
        <div className="app__header"></div>
        <div className="app__content">
          <Template editableFields={editableFields} data={data} mode={mode}>
            <TemplateImmutable
              inputValue={data['prefix'] || null}
              inputKey="prefix"
              labelText="Prefix"
            />
            <TemplateImmutable
              inputValue={data.teamLead.name}
              inputKey="teamLead"
              labelText="Project Lead"
            />
            <TemplateSelect
              inputValue={data.status}
              inputKey="status"
              type="text"
              labelText="Status"
              options={['Not released', 'In progress', 'Testing', 'Released']}
            />
            <TemplateInput
              inputValue={data.progress}
              inputKey="progress"
              type="number"
              labelText="Progress"
            />
            <TemplateInput
              inputValue={data.name}
              inputKey="name"
              type="text"
              labelText="Name"
            />
            <TemplateDateInput
              inputValue={data.deadline}
              inputKey="deadline"
              labelText="Deadline"
            />
            <TemplateDateInput
              inputValue={data.startDate}
              inputKey="startDate"
              labelText="Start Date"
            />
            <TemplateDateInput
              inputValue={data.endDate}
              inputKey="endDate"
              labelText="End Date"
            />
            <TemplateTextarea
              inputValue={data.description}
              inputKey="description"
              labelText="Description"
              className="colspan2"
            />
            <UserMultiselect
              inputValue={data.teamMembers}
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
