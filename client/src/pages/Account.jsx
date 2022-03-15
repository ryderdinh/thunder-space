import Layout from 'components/Layouts/Layout';
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer';
import Main from 'components/Main/Main';
import AccountContainer from 'components/Main/ViewMain/AccountContainer';
import ViewBox from 'components/Main/ViewMain/ViewBox';
import ViewMain from 'components/Main/ViewMain/ViewMain';
import variantGlobal from 'units/variantGlobal';

export default function Account() {
	const path = 'account';

	return (
		<Layout>
			<Main>
				<HeaderContainer pathName={path} />
				<ViewMain>
					<ViewBox>
						<AccountContainer
							variants={variantGlobal({ type: 2, addValue: 0 })}
						/>
					</ViewBox>
				</ViewMain>
			</Main>
		</Layout>
	);
}
