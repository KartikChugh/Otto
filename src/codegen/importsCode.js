const StringBuilder = require('string-builder');

const standardImportsCode = () => {

    return `
import matplotlib.pyplot as plt 
import numpy as np 
from sklearn.model_selection import train_test_split
    `;

}

const linearImportsCode = () => {
    
    const linearImports = `
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
    `;

    return linearImports;

}