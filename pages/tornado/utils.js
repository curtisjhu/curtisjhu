export const utils = `
const float pi = 3.14159;

mat3 xrot(float t)
{
    return mat3(1.0, 0.0, 0.0,
                0.0, cos(t), -sin(t),
                0.0, sin(t), cos(t));
}

mat3 yrot(float t)
{
    return mat3(cos(t), 0.0, -sin(t),
                0.0, 1.0, 0.0,
                sin(t), 0.0, cos(t));
}

mat3 zrot(float t)
{
    return mat3(cos(t), -sin(t), 0.0,
                sin(t), cos(t), 0.0,
                0.0, 0.0, 1.0);
}

float sdCappedCylinder( vec3 p, vec2 h )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - h;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float smin( float a, float b, float k )
{
    float res = exp( -k*a ) + exp( -k*b );
    return -log( res )/k;
}

float map(vec3 pos, float q)
{
    float so = q;
    float sr = atan(pos.z,pos.x);
    so += pos.y * 0.5;
    so += sin(pos.y*75.0+sr-iTime) * 0.005;
    so += sin(pos.y*125.0+sr-iTime*10.0) * 0.004;
    float ro = pos.y*10.0-iTime;
    pos.xz += vec2(cos(ro), sin(ro)) * 0.07;
	float d = sdCappedCylinder(pos, vec2(so, 10.0));
    float k = pos.y;
    return smin(d,k,10.0);
}
`;