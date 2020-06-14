export const loadSampleDatasetFunctionCode = (dataset) => {
    return `def loadData():
    return datasets.load_${dataset}(return_X_y=True)
`;
}

export const loadDataFunctionCode = () => {
    return `## Replace with your own dataset! Return X, y sets
def loadData():
    return None, None
    `
}

export const loadDataCode = () => {
    return  `X, y = loadData()`;
}

export const splitDataCode = () => {
    return `# Split the data into training/testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    `;
}