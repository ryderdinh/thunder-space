import React, { useEffect } from 'react';

function WorkflowContainer() {
	useEffect(() => {
		document.title = `Không gian làm việc`;
	}, []);

	return <div></div>;
}

export default WorkflowContainer;
