import Layout from 'components/Layouts/Layout';
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer';
import Main from 'components/Main/Main';
import TimesheetDetail from 'components/Main/ViewMain/TimesheetDetail';
import Timesheets from 'components/Main/ViewMain/Timesheets';
import ViewBox from 'components/Main/ViewMain/ViewBox';
import ViewMain from 'components/Main/ViewMain/ViewMain';
import variantGlobal from 'units/variantGlobal';

export default function TimeSheets() {
	const path = 'timesheets';

	return (
		<Layout>
			<Main>
				<HeaderContainer pathName={path} />
				<ViewMain>
					<ViewBox>
						<Timesheets variants={variantGlobal({ type: 1, addValue: 0 })} />
						<TimesheetDetail
							variants={variantGlobal({ type: 1, addValue: 0.3 })}
						/>
					</ViewBox>
				</ViewMain>
			</Main>
		</Layout>
	);
}