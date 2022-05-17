import { getBlockNodeByChildEle } from './getBlockNodeByChildEle';

export type DirectionPosition = {
  horizontal: {
    direction: string;
    isEdge: boolean;
  };
  vertical: {
    direction: string;
    isEdge: boolean;
  };
};

export function getDirectionPosition(
  ev: {
    target: EventTarget | null;
    clientY: number;
    clientX: number;
  },
  deviation = 15
): DirectionPosition {
  const target = ev.target as HTMLElement;
  const blockNode = getBlockNodeByChildEle(target);
  const position = {
    horizontal: {
      direction: '',
      isEdge: false,
    },
    vertical: {
      direction: '',
      isEdge: false,
    },
  };
  if (!blockNode) return position;
  const { top, height, left, width } = blockNode.getBoundingClientRect();

  const mouseY = ev.clientY;
  const mouseX = ev.clientX;
  const deviationX = Math.max(deviation, width * 0.1);
  const deviationY = Math.max(deviation, height * 0.1);

  if (mouseY - top <= 0.5 * height) {
    position.vertical.direction = 'top';
    if (Math.abs(top - mouseY) <= deviationY) {
      position.vertical.isEdge = true;
    }
  } else {

    position.vertical.direction = 'bottom';
    if (Math.abs(top + height - mouseY) <= deviationY) {
      position.vertical.isEdge = true;
    }
  }

  if (mouseX - left <= 0.5 * width) {
    position.horizontal.direction = 'left';
    if (Math.abs(left - mouseX) <= deviationX) {
      position.horizontal.isEdge = true;
    }
  } else {
    position.horizontal.direction = 'right';

    if (Math.abs(left + width - mouseX) <= deviationX) {
      position.horizontal.isEdge = true;
    }
  }

  return position;
}
