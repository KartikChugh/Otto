export const params = (neighbors) => {
    return `NEIGHBORS = ${neighbors}`;
}

export const slice = () => {
    return `X = X[:, :2]`;
}

export const model = () => {

    const knn = 
`# we create an instance of Neighbours Classifier and fit the data.
clf = neighbors.KNeighborsClassifier(NEIGHBORS)
clf.fit(X, y)

# Plot the decision boundary. For that, we will assign a color to each
# point in the mesh [x_min, x_max]x[y_min, y_max].
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, .02),
                        np.arange(y_min, y_max, .02))
Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])

# Put the result into a color plot
cmap = 'coolwarm'
Z = Z.reshape(xx.shape)
plt.figure()
plt.contourf(xx, yy, Z, cmap=cmap, alpha=0.7)

# Plot the training points
plt.scatter(X[:, 0], X[:, 1], c=y, cmap=cmap,
            edgecolor='k', s=20)
plt.xlim(xx.min(), xx.max())
plt.ylim(yy.min(), yy.max())
plt.title("Classification (k = %i)"
            % (NEIGHBORS))

plt.show()
`;
    return knn;
}