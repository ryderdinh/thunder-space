import 'assets/css/Wf.css';
import Layout from 'components/Layouts/Layout';
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer';
import Main from 'components/Main/Main';
import ViewBox from 'components/Main/ViewMain/ViewBox';
import ViewMain from 'components/Main/ViewMain/ViewMain';
import WorkflowContainer from 'components/Workfow/WorkflowContainer';

export default function Workflow() {
	const path = 'workflow';

	return (
		<Layout>
			<Main>
				<HeaderContainer pathName={path} />
				<ViewMain>
					<ViewBox>
						<WorkflowContainer />
					</ViewBox>
				</ViewMain>
			</Main>
		</Layout>
	);
}
