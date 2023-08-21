# Brownian Motion

### Arithmetic Brownian Motion

Somewhat like random walk.

Take the Bernoulli Experiment (coin flip):

$$ X_i = 
	\begin{cases}
		1 \text{ if } p \\
		-1 \text{ if } (1-p)
	\end{cases}
$$

Now add in a average win or loss (variance)
$$ \sigma X_i = 
	\begin{cases}
		\sigma \text{ if } p \\
		-\sigma \text{ if } (1-p)
	\end{cases}
$$

Now play this coin flipping game discretely for each time t
$$
	X(t) = X(0) + \sigma \sqrt{n} \sum X_i
$$

$X(t)$ is a RV for each unique time t. (Think of each time step as a separate coin flip).

However brownian motion is continuous:
$$ \lim_{h \rightarrow 0} X(t + h) - X(t) = 0 $$


### Geometric Brownian Motion (Modeling Stock Prices)



### CLT

Notice that as time continues, variance grows and expected value increase or decreases. Following a normal distribution.
