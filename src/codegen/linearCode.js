const linearParamsCode = (column) => {
    return `FEATURE_COLUMN = ${column}`;
}

const linearSliceCode = () => {
    return `X = X[:, np.newaxis, FEATURE_COLUMN]`;
}

const linearModelCode = () => {

    const linear = 
    `    
    # Split the data into training/testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create linear regression object
    regr = linear_model.LinearRegression()
    
    # Train the model using the training sets
    regr.fit(X_train, y_train)
    
    # Make predictions using the testing set
    y_pred = regr.predict(X_test)
    
    # The coefficients
    print('Coefficients: \n', regr.coef_)
    # The mean squared error
    print('Mean squared error: %.2f'
          % mean_squared_error(y_test, y_pred))
    # The coefficient of determination: 1 is perfect prediction
    print('Coefficient of determination: %.2f'
          % r2_score(y_test, y_pred))
    
    # Plot outputs
    plt.scatter(X_test, y_test,  color='black')
    plt.plot(X_test, y_pred, color='blue', linewidth=3)
    plt.title('Linear Regression Model')
    
    plt.show()
`;
    return linear;
}

const poissonModelCode = () => {
    const poisson = 
    `    
    # Split the data into training/testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create linear regression object
    regr = linear_model.PoissonRegressor()
    
    # Train the model using the training sets
    regr.fit(X_train, y_train)
    
    # Make predictions using the testing set
    y_pred = regr.predict(X_test)
    
    # The coefficients
    print('Coefficients: \n', regr.coef_)
    # The mean poisson deviance
    print('Mean poisson deviance: %.2f'
          % mean_poisson_deviance(y_test, y_pred))
    
    # Plot outputs
    plt.scatter(X_test, y_test,  color='black')
    plt.plot(X_test, y_pred, color='blue', linewidth=3)
    plt.title('Poisson Regression Model')
    
    plt.show()
`;
    return poisson;
}