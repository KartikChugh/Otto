export const normalization = () => {
    return `X = scale(X)`
}

export const pca = () => {
    return `X = PCA(COMPONENTS).fit_transform(X)`
}

export const textCleaning = () => {
    return `data.str.strip()
data.replace('\?|\.|\!|\/|\;|\:|\#', '', regex=True)`
}

export const paramsPca = (components) => {
    return `COMPONENTS = ${components}`
}