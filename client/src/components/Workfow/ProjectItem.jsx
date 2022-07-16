import WorkflowItem from './WorkflowItem';

export default function ProjectList({ data, wf, search }) {
	//? Create Variable
	const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
	const variants = {
		initial: { scale: 0.9, opacity: 0 },
		enter: { scale: 1, opacity: 1, transition },
		exit: {
			scale: 0.5,
			opacity: 0,
			transition: { duration: 1.5, ...transition }
		}
	};

	//? Create Function
	const handleRenderData = (dataProject, searchIssue) => {
		let check = 0;
		let dataProjectResult = dataProject;

		if (searchIssue) {
			for (let item of dataProjectResult) {
				item.projectIssue = item.projectIssue.filter(
					issue => issue.issueCode.indexOf(searchIssue) !== -1
				);
			}
		}

		for (let i = 0; i < dataProjectResult.length; i++) {
			check += dataProjectResult[i].projectIssue.length;
		}

		return !check ? (
			<p style={{ margin: '0 auto' }}>Không có dữ liệu</p>
		) : (
			dataProjectResult.map(project =>
				project.projectIssue.map(issue => (
					<WorkflowItem
						key={issue.iid}
						data={{
							type: 'project',
							projectCode: project.projectCode,
							issueId: issue.iid,
							issueCode: issue.issueCode,
							issueName: issue.issueName,
							issueType: `iss-${issue.issueType}`,
							toIssue: `project/${project.projectCode}/${issue.issueCode}?wftype=${wf.workflowType}&&wfi=${wf.workflowId}`
						}}
						variants={variants}
					/>
				))
			)
		);
	};

	return <div className='wf-list fl-col'>{handleRenderData(data, search)}</div>;
}
