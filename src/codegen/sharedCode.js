const loadDataCode = (dataset) => {
    return `
    def loadData():
        return datasets.load_boston(return_X_y=True)
    `;
}