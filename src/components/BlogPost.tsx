import React, { useEffect, useState } from 'react';
import {
  ButtonGroup,
  IconButton,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
  useEditableControls,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import Draggable from 'react-draggable';
import sx from '../utils/styles';

// interface EditableControlsProps {
//   setEditMode: React.Dispatch<React.SetStateAction<string>>;
// }


function EditablePost() {
  const [editMode, setEditMode] = useState<string>('viewing');
  
  const nodeRef = React.useRef(null);
  useEffect(() => {
    console.log('editMode', editMode);
  }, [editMode]);
  
  function EditableControls(
    // { setEditMode }: EditableControlsProps
    ) {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
  
    // useEffect(() => {
    //   console.log('isEditing', isEditing);
    //   if (isEditing) {
    //     setEditMode('editing');
    //   } else {
    //     setEditMode('viewing');
    //   }
    // }, [isEditing]);
  
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label='submit' />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label='cancel' />
      </ButtonGroup>
    ) : (
      <>
        <IconButton icon={<EditIcon />} {...getEditButtonProps()} aria-label='edit' size='sm' />
      </>
    );
  }
  return (
    <Draggable axis='y' nodeRef={nodeRef} disabled={editMode !== 'editing'}>
      <Editable
        submitOnBlur={false}
        isPreviewFocusable={false}
        onEdit={() => setEditMode('editing')}
        onSubmit={() => setEditMode('viewing')}
        onCancel={() => setEditMode('viewing')}
        textAlign='center'
        defaultValue='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
        fontSize='md'
        style={sx}
        ref={nodeRef}
      >
        <EditablePreview />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Draggable>
  );
}

export default EditablePost;
