export const loadDatasetFunctionCode = (dataset) => {
    return `
    def loadData():
        return datasets.load_${dataset}(return_X_y=True)
    `;
}

export const loadDataFunctionCode = () => {
    return `
    ## Replace with your own dataset!
    def loadData():
        return None, None
    `
}

export const loadDataCode = () => {
    return  `X, y = loadData()`;
}