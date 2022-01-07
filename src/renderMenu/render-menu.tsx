import React, { Children, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from '../ViewSDKClient';
import styles from './render-menu.module.css';

declare global {
	interface Window {
		onDocumentLoad: () => void;
	}
}

const RenderMenu = (props: any) => {
	const [state, setState] = React.useState({
		isDataLoaded: false,
		menuLink: '',
		hasFile: false,
	});
	useEffect(() => {
		setState({
			isDataLoaded: true,
			hasFile: true,
			menuLink:
				'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf',
		});
	}, []);
	const loadPDF = () => {
		console.log('test');
		const viewSDKClient = new ViewSDKClient();
		viewSDKClient.ready().then(() => {
			viewSDKClient.previewFile(
				'pdf-div',
				{
					showAnnotationTools: true,
					showLeftHandPanel: false,
					showPageControls: false,
					showDownloadPDF: false,
					showPrintPDF: false,
				},
				state.menuLink
			);
		});
	};

	const CustomDiv = (props: any) => {
		return <div {...props}></div>;
	};
	return (
		<div className={styles.root}>
			{state.isDataLoaded ? (
				<div>
					{state.hasFile ? (
						<>
							<CustomDiv
								id="pdf-div"
								className={styles.pdfDiv}
								onDocumentLoad={loadPDF()}
							></CustomDiv>
						</>
					) : (
						<div>
							<p className="text dashboard" id="no-file">
								Sorry, no file at this link
							</p>
						</div>
					)}
				</div>
			) : (
				<div className="cp">
					<CircularProgress style={{ color: '#ffc107' }} />
				</div>
			)}
		</div>
	);
};
export default RenderMenu;
