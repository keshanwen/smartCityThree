

export function getContainerWH(dom:HTMLElement) {
  const { width, height } = dom.getBoundingClientRect();

  return {
    width,
    height,
  };
}