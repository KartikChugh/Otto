export const params = (column) => {
    return `FEATURE_COLUMN = ${column}`;
}

export const slice = () => {
    return `X = X[:, np.newaxis, FEATURE_COLUMN]`;
}

export const modelLinear = () => {

    const linear = 
`# Create linear regression object
regr = linear_model.LinearRegression()

# Train the model using the training sets
regr.fit(X_train, y_train)

# Make predictions using the testing set
y_pred = regr.predict(X_test)

# The coefficients
print('Coefficients: ', regr.coef_)
# The mean squared error
print('Mean squared error: %.2f' % mean_squared_error(y_test, y_pred))
# The coefficient of determination: 1 is perfect prediction
print('Coefficient of determination: %.2f' % r2_score(y_test, y_pred))

# Plot outputs
plt.scatter(X_test, y_test,  color='black')
plt.plot(X_test, y_pred, color='blue', linewidth=3)
plt.title('Linear Regression Model')

plt.show()
`;
    return linear;
}

export const modelPoisson = () => {
    const poisson = 
`# Create linear regression object
regr = linear_model.PoissonRegressor()

# Train the model using the training sets
regr.fit(X_train, y_train)

# Make predictions using the testing set
y_pred = regr.predict(X_test)

# The coefficients
print('Coefficients: ', regr.coef_)
# The mean poisson deviance
print('Mean poisson deviance: %.2f' % mean_poisson_deviance(y_test, y_pred))

# Plot outputs
plt.scatter(X_test, y_test,  color='black')
plt.plot(X_test, y_pred, color='blue', linewidth=3)
plt.title('Poisson Regression Model')

plt.show()
`;
    return poisson;
}

export const modelOrdinal = () => {
    const ordinal = 
`# Create linear regression object
regr = mord.OrdinalRidge()

# Train the model using the training sets
regr.fit(X_train, y_train)

# Make predictions using the testing set
y_pred = regr.predict(X_test)

# The coefficients
print('Coefficients: ', regr.coef_)
# The accuracy
print('Accuracy: %.2f' % accuracy_score(y_test, y_pred))

# Plot outputs
plt.scatter(X_test, y_test,  color='black')
plt.plot(X_test, y_pred, color='blue', linewidth=3)
plt.title('Ordinal Regression Model')

plt.show()
`;
    return ordinal;
}