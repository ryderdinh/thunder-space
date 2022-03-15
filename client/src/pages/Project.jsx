import 'assets/css/Wf.css';
import Layout from 'components/Layouts/Layout';
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer';
import Main from 'components/Main/Main';
import ViewBox from 'components/Main/ViewMain/ViewBox';
import ViewMain from 'components/Main/ViewMain/ViewMain';
import ProjectContainer from 'components/Workfow/ProjectContainer';
import variantGlobal from 'units/variantGlobal';

export default function Project() {
	const path = 'project';
	return (
		<Layout>
			<Main>
				<HeaderContainer pathName={path} />
				<ViewMain>
					<ViewBox>
						<ProjectContainer
							variants={variantGlobal({ type: 2, addValue: 0 })}
						/>
					</ViewBox>
				</ViewMain>
			</Main>
		</Layout>
	);
}
