export const supportsAnchorPositioning = () => {
  return CSS.supports('top', 'anchor(center)');
};
