import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';

export class EventManager {
  private static events: { [key: string]: ((...args: any[]) => any)[]; } = {};

  public static on(type: EventType.ACTIVE_TAB_CHANGE, callback: (payload: { currentTab: ActiveTabKeys, nextTab: ActiveTabKeys; }) => boolean): void;
  public static on(type: EventType.FOCUS_IDX_CHANGE, callback: (payload: { currentIdx: string, nextIdx: string; }) => boolean): void;
  public static on(type: EventType.FOCUS_IDX_CHANGE_BY_EDITOR, callback: (payload: { nextIdx: string; }) => boolean): void;
  public static on(type: EventType.FOCUS_IDX_CHANGE_BY_LAYER, callback: (payload: { nextIdx: string; }) => boolean): void;
  public static on(type: EventType, handler: (...args: any[]) => any) {
    const event = this.events[type];
    if (!event) {
      this.events[type] = [handler];
    } else {
      event.push(handler);
    }
  }

  public static off(type: EventType, handler: (...args: any[]) => any) {
    this.events[type] = this.events[type].filter(h => h !== handler);
  }

  public static exec(type: EventType.ACTIVE_TAB_CHANGE, payload: { currentTab: ActiveTabKeys, nextTab: ActiveTabKeys; }): boolean;
  public static exec(type: EventType.FOCUS_IDX_CHANGE, payload: { currentIdx: string, nextIdx: string; }): boolean;
  public static exec(type: EventType.FOCUS_IDX_CHANGE_BY_EDITOR, payload: { nextIdx: string; }): boolean;
  public static exec(type: EventType.FOCUS_IDX_CHANGE_BY_LAYER, payload: { nextIdx: string; }): boolean;
  public static exec(type: EventType, ...args: any[]): boolean {
    const event = this.events[type];

    if (!event) {
      return true;
    }
    let next = true;
    event.forEach(handler => {
      if (handler(...args) === false) {
        next = false;
      }
    });
    return next;
  }
}

export enum EventType {
  FOCUS_IDX_CHANGE = 'focusIdxChange',

  FOCUS_IDX_CHANGE_BY_EDITOR = 'focusIdxChangeByEditor',

  FOCUS_IDX_CHANGE_BY_LAYER = 'focusIdxChangeByLayer',

  ADD_BLOCK = 'addBlock',

  REMOVE_BLOCK = 'removeBlock',

  ACTIVE_TAB_CHANGE = 'activeTabChange',
}