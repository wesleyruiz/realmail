export const getEditorWindow = () => (document.getElementById('VisualEditorEditMode') as HTMLIFrameElement)?.contentWindow! as Window & typeof globalThis;