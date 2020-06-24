export const defineLoadDataset = (dataset) => {
    return `
def loadData():
    return datasets.load_${dataset}(return_X_y=True)`;
}

export const defineLoadDatasetNLP = (dataset) => {
    return `
def loadData():
    return pd.read_csv("${dataset}", encoding="latin-1")`
}

export const defineLoadUnspecified = () => {
    return `
# Replace with your own dataset! Return X, y sets for class/reg, or just one dataset for NLP
def loadData():
    return None, None
    `
}

export const load = () => {
    return  `X, y = loadData()`;
}

export const loadNLP = () => {
    return `data = loadData()`
}

export const split = () => {
    return `# Split the data into training/testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    `;
}