import Layout from 'components/Layouts/Layout';
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer';
import Main from 'components/Main/Main';
import IssueContainer from 'components/Issue/IssueContainer';
import ViewBox from 'components/Main/ViewMain/ViewBox';
import ViewMain from 'components/Main/ViewMain/ViewMain';

export default function Issue() {
	const path = 'issue';
	return (
		<Layout>
			<Main>
				<HeaderContainer pathName={path} />
				<ViewMain>
					<ViewBox>
						<IssueContainer />
					</ViewBox>
				</ViewMain>
			</Main>
		</Layout>
	);
}
