import { ImageUploaderProps } from '@extensions/components/Form/ImageUploader';
import React, { useMemo } from 'react';
import { useEditorProps, useFocusIdx } from 'realmail-editor';
import { ImageUploaderField } from '../../../components/Form';

export function ImageUrl({ name, title = 'Image', autoCompleteOptions }: { name?: string; title?: string; autoCompleteOptions?: ImageUploaderProps['autoCompleteOptions']; }) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return useMemo(() => {
    return (
      <ImageUploaderField
        label={title}
        name={name || `${focusIdx}.attributes.src`}
        uploadHandler={onUploadImage}
        autoCompleteOptions={autoCompleteOptions}
      />
    );
  }, [autoCompleteOptions, focusIdx, name, onUploadImage, title]);
}
