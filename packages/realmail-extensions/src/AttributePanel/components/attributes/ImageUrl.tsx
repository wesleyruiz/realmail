import React, { useMemo } from 'react';
import { useEditorProps, useFocusIdx } from 'realmail-editor';
import { ImageUploaderField } from '../../../components/Form';

export function ImageUrl({ name, title = 'Image' }: { name?: string; title?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return useMemo(() => {
    return (
      <ImageUploaderField
        label={title}
        name={name || `${focusIdx}.attributes.src`}
        helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />
    );
  }, [focusIdx, name, onUploadImage, title]);
}
