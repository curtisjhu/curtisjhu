

## Inspiration

This project follows John Baez's (UCR) "Beauty of Roots" post in March of 2023.
Check out the original project at [https://math.ucr.edu/home/baez/roots/](https://math.ucr.edu/home/baez/roots/)

The original project took 4 days of computation and created 94 MB of data.
We are going to create a less powerful version in the browser

### Approach

Before each fragment render, we are pregenerating all possible complex roots of all integer coefficient polynomials in javascript. As a result, we get a constant and final buffer object with all positions that we send to the vertex shader and is then passed to the fragment shader.

### Durand-Kerner Method
We are using the [Durand-Kerner Method](https://en.wikipedia.org/wiki/Durand%E2%80%93Kerner_method) for finding roots of a $n$ degree polynomial. We could alternatively use the [Newton's Method](https://en.wikipedia.org/wiki/Newton%27s_method) but with the Durand-Kerner Method, 

In this example we'll use a polynomial of degree 3 and $a_3 = 1$ as it makes our calculations easier:
$$ f(x) = x^3 + ax^2 + bx + c$$
>  where $a,b,c  \in \Z $

We know that we can ultimately rewrite this polynomial as:
$$ f(x) = (x-Y)(x-Z)(x-W)(x-U)$$
> where $Y,Z, W, U \in \Complex$

Alright, so far pretty straight forwards. We can solve for Y by simply reorganizing the equation:
$$ Y = x-\frac{f(x)}{(x-Z)(x-W)(x-U)}$$

Now what's the significance of this?




Eilich 