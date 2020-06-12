const loadDataFunctionCode = (dataset) => {
    return `
    def loadData():
        return datasets.load_${dataset}(return_X_y=True)
    `;
}

const loadDataCode = () => {
    return  `X, y = loadData()`;
}