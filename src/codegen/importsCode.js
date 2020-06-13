const StringBuilder = require('string-builder');

const standardImportsCode = () => {

    return `
import matplotlib.pyplot as plt 
import numpy as np 
from sklearn.model_selection import train_test_split
    `;

}

const linearImportsCode = () => {
    return `
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
    `;
}

const poissonImportsCode = () => {
    return `
from sklearn import linear_model
from sklearn.metrics import mean_poisson_deviance
    `;
}

const ordinalImportsCode = () => {
    return `
import mord
from sklearn.metrics import accuracy_score
    `;
}

const knnImportsCode = () => {
    return `from sklearn import neighbors`
}

const datasetsImportCode = () => {
    return `from sklearn import datasets`
}