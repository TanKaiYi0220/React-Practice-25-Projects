const dummyAPIResponse = {
    showLightAndDarkMode: true,
    showTicTacToe: true,
    showRandomColorGenerator: true,
    showAccordian: false,
    showTreeView: true,
}

function featureFlagsDataServiceCall() {
    return new Promise((resolve, reject) => {
        if (dummyAPIResponse) {
            setTimeout(() => {
                resolve(dummyAPIResponse);
            }, 1000);
        } else {
            reject(new Error('Failed to fetch feature flags data'));
        }
    });
}


export default featureFlagsDataServiceCall;