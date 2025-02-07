// language=GLSL
// for coloring of nodes
const SHADER_SOURCE = /*glsl*/ `
precision mediump float;

varying vec4 v_color;
varying float v_border;

const float radius = 0.5;
const float halfRadius = 0.25;

void main(void) {
  vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
  vec4 gray = vec4(0.13, 0.15, 0.18, 1.0);
  vec4 gr = mix(v_color, gray, 0.5);
  vec4 cl = vec4(0.2, 0.6, 0.3, 1.0);
  float distToCenter = length(gl_PointCoord - vec2(0.5, 0.5));
  float distToGradientCenter = length(gl_PointCoord - vec2(0, 0));

  // color every pixel
  #ifdef PICKING_MODE
  if (distToCenter < radius)
    gl_FragColor = v_color;
  #else 
  if (distToCenter > radius)
  // basically pixels outside node
    gl_FragColor = transparent;
  else if (distToCenter > radius - v_border)
    // border
    gl_FragColor = mix(transparent, v_color, (radius - distToCenter) / v_border);
  else
    // gradient 
    // gl_FragColor = mix(v_color, gray, (halfRadius - distToCenter) / radius);
    gl_FragColor = mix(v_color, gr, ((radius - distToGradientCenter) / radius) + 0.4);
    // gl_FragColor = v_color;
  #endif
}
`;

export default SHADER_SOURCE;
