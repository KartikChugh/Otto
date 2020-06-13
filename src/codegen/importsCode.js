export const standardImportsCode = () => {

return `import matplotlib.pyplot as plt 
import numpy as np 
from sklearn.model_selection import train_test_split`;

}

export const linearImportsCode = () => {
    return `from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
    `;
}

export const poissonImportsCode = () => {
    return `from sklearn import linear_model
from sklearn.metrics import mean_poisson_deviance
    `;
}

export const ordinalImportsCode = () => {
    return `import mord
from sklearn.metrics import accuracy_score
    `;
}

export const knnImportsCode = () => {
    return `from sklearn import neighbors`;
}

export const nnImportsCode = () => {
    return `from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Input
    `;
}

export const datasetsImportCode = () => {
    return `from sklearn import datasets`
}