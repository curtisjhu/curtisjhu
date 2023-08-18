

Steps for a parametric surface.
- Create a UV plane. With bounds for u and v.
- Divide the plane into triangles to create mesh.positions (all vertices or geometric coordinates), mesh.cells (all indices that say "this is a triangle")
- In you vertex shader, take the current position from uv plane and map it into a position in 3d place using the parametric function.
- Color as you desire.