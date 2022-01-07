declare global {
	interface Window {
		AdobeDC: any;
	}
}

class ViewSDKClient {
	readyPromise: Promise<unknown>;
	adobeDCView: any;
	constructor() {
		this.readyPromise = new Promise<void>((resolve) => {
			if (window.AdobeDC) {
				resolve();
			} else {
				document.addEventListener('adobe_dc_view_sdk.ready', () => {
					resolve();
				});
			}
		});
		this.adobeDCView = undefined;
	}
	ready() {
		return this.readyPromise;
	}
	previewFile(divId: any, viewerConfig: any, url: any) {
		const config: any = {
			clientId: '8acff05a7a1d40d29a804a40a0970e43', //Enter your Client ID here
		};
		if (divId) {
			config.divId = divId;
		}
		this.adobeDCView = new window.AdobeDC.View(config);
		const previewFilePromise =
			this.adobeDCView &&
			this.adobeDCView.previewFile(
				{
					content: {
						location: {
							url: url,
						},
					},
					metaData: {
						fileName: 'Menu.pdf',
						id: '6d07d124-ac85-43b3-a867-36930f502ac6',
					},
				},
				viewerConfig
			);
		return previewFilePromise;
	}
	previewFileUsingFilePromise(divId: any, filePromise: any, fileName: any) {
		this.adobeDCView = new window.AdobeDC.View({
			clientId: '8acff05a7a1d40d29a804a40a0970e43', //Enter your Client ID here
			divId,
		});
		this.adobeDCView &&
			this.adobeDCView.previewFile(
				{
					content: {
						promise: filePromise,
					},
					metaData: {
						fileName: fileName,
					},
				},
				{}
			);
	}
	registerSaveApiHandler() {
		const saveApiHandler = (metaData: any, content: any, options: any) => {
			console.log(metaData, content, options);
			return new Promise((resolve) => {
				setTimeout(() => {
					const response = {
						code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
						data: {
							metaData: Object.assign(metaData, {
								updatedAt: new Date().getTime(),
							}),
						},
					};
					resolve(response);
				}, 2000);
			});
		};
		this.adobeDCView &&
			this.adobeDCView.registerCallback(
				window.AdobeDC.View.Enum.CallbackType.SAVE_API,
				saveApiHandler,
				{}
			);
	}
	registerEventsHandler() {
		this.adobeDCView &&
			this.adobeDCView.registerCallback(
				window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
				(event: any) => {
					console.log(event);
				},
				{
					enablePDFAnalytics: true,
				}
			);
	}
}

export default ViewSDKClient;
