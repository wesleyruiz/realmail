import { debounce } from 'lodash';

export const isMouseEvent = (
  event: MouseEvent | TouchEvent
): event is MouseEvent => !!(event.type.indexOf('mouse') !== -1);

/**
 *
 * @param event
 */
export const onDrag = ({
  event,
  onMove,
  onEnd,
}: {
  event: TouchEvent | MouseEvent;
  onMove: (x: number, y: number) => void;
  onEnd?: () => void;
}) => {
  event.preventDefault();
  event.stopPropagation();
  let initX = 0;
  let initY = 0;
  if (isMouseEvent(event)) {
    initX = event.clientX;
    initY = event.clientY;
  } else {
    initX = event.touches[0].clientX;
    initY = event.touches[0].clientY;
  }

  const onDragMove = (mEvt: TouchEvent | MouseEvent) => {
    const outerIframe = [...document.querySelectorAll('iframe')].find(item => item.contentDocument === (mEvt.target as HTMLElement)?.getRootNode());

    let movX = 0;
    let movY = 0;

    if (isMouseEvent(mEvt)) {
      movX = mEvt.clientX;
      movY = mEvt.clientY;
    } else {
      movX = mEvt.touches[0].clientX;
      movY = mEvt.touches[0].clientY;
    }

    if (outerIframe) {
      const { left, top } = outerIframe.getBoundingClientRect();
      movX = movX + left;
      movY = movY + top;
    }

    const diffX = movX - initX;
    const diffY = movY - initY;
    onMove(diffX, diffY);
  };

  const onDragEnd = () => {

    onEnd && onEnd();

    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend', onDragEnd);

    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);

    // iframe
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.contentWindow?.removeEventListener('touchmove', onDragMove);
      iframe.contentWindow?.removeEventListener('touchend', onDragEnd);

      iframe.contentWindow?.removeEventListener('mousemove', onDragMove);
      iframe.contentWindow?.removeEventListener('mousemove', onDragEnd);
    });

  };

  window.addEventListener('touchmove', onDragMove);
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  // iframe
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.contentWindow?.addEventListener('touchmove', onDragMove);
    iframe.contentWindow?.addEventListener('touchend', onDragEnd);

    iframe.contentWindow?.addEventListener('mousemove', onDragMove);
    iframe.contentWindow?.addEventListener('mouseup', onDragEnd);
  });
};
