import { actFetchProject } from 'actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ProjectList from './ProjectItem';
import WorkflowAction from './WorkflowAction';
import WorkflowName from './WorkflowName';

export default function ProjectContainer() {
	//? React router api
	let { pcode } = useParams();
	let history = useHistory();
	let location = useLocation();
	//? Create State
	// eslint-disable-next-line no-unused-vars
	const [state, setState] = useState({
		searchData: { searchIssue: '' }
	});

	//? Connect redux
	let dataProject = useSelector(state => state._project._dataProject);
	const wf = useSelector(state => state._workflow._workflowHeader);
	const dispatch = useDispatch();

	//? Create Effect
	useEffect(() => {
		document.title = `Quản lý dự án`;
	}, []);

	useEffect(() => {
		if (!pcode) {
			getSearchValue(location.search);
		} else {
			dispatch(actFetchProject([pcode]));
		}
		getSearchValue(location.search);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pcode, location.search]);

	//? Cteate Function
	// eslint-disable-next-line no-unused-vars
	const handleSearchProject = keyword => {
		history.push(`${location.pathname}/${keyword}`);
	};

	const handleSearchIssue = () => {
		history.push(
			`${location.pathname}?searchissue=${state.searchData.searchIssue}`
		);
	};

	const handleSetIssueFromSearch = value => {
		setState(prevState => ({
			...prevState,
			searchData: {
				...prevState.searchData,
				searchIssue: value
			}
		}));
	};
	const getSearchValue = value => {
		if (value !== '') {
			const search = new URLSearchParams(`${value}`);
			let searchData = { searchIssue: '', searchMultiProject: [] };
			for (let [key, value] of search) {
				let valueTexte = '';
				if (value === undefined) valueTexte = '';
				else valueTexte = value;
				if (key === 'searchissue') {
					searchData['searchIssue'] = valueTexte;
					setState(prevState => ({
						...prevState,
						searchData: { ...prevState.searchData, searchIssue: valueTexte }
					}));
				}
				if (key === 'searchmultiproject' && valueTexte !== '') {
					searchData['searchMultiProject'].push(valueTexte);
				}
			}
			dispatch(actFetchProject());
			if (
				searchData.hasOwnProperty('searchMultiProject') &&
				searchData.searchMultiProject.length > 0
			) {
				dispatch(actFetchProject(searchData.searchMultiProject));
			}
		} else dispatch(actFetchProject());
	};

	return (
		<div className='wf-container project'>
			<div className='wf-header row fl-row al-center'>
				<WorkflowName
					path={`/${wf.workflowType}/${wf.workflowId}`}
					name={wf.workflowName}
				/>
				<div className='wf-action'>
					<WorkflowAction
						type='search'
						handleSearchIssue={handleSearchIssue}
						handleSetIssueFromSearch={handleSetIssueFromSearch}
						search={state.searchData.searchIssue}
					/>
					<WorkflowAction type='add' />
					<WorkflowAction type='list' />
					<WorkflowAction type='filter' />
					<WorkflowAction type='reload' />
					{wf.workflowId === '' ? '' : <WorkflowAction type='info' />}
				</div>
			</div>
			<div className='wf-body row fl-col'>
				<div className='wf-main fl-col'>
					<ProjectList
						data={dataProject}
						wf={wf}
						search={state.searchData.searchIssue}
					/>
					<div className='wf-pagination'></div>
				</div>
			</div>
		</div>
	);
}
