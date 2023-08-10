# Mandelbrot Set

# todo
pixels are bad when you get too close
doesn't scale when you change the window

The general mandelbrot set is very simple. Here's the pseudocode:
```
# is c (complex number) in the mandelbrot set?
def mandelbrot(c):
 	# (complex number)
	z = 0
	i = 100
	while (i):
		z = z*z + c
		if (z > 1e3):
			return True
		i -= 1
	return False
```