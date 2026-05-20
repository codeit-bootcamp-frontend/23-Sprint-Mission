import styled from 'styled-components';
import TextareaBox from '../form/TextareaBox';
import SubmitButton from '../form/SubmitButton';

function EditCommentForm({ value, onChange, onSubmit, onCancel }) {
  return (
    <Form onSubmit={onSubmit}>
      <EditCommentTextarea value={value} onChange={onChange} />
      <EditButtonWrap>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
        <EditCommentSubmitButton type="submit" disabled={!value.trim()}>
          수정 완료
        </EditCommentSubmitButton>
      </EditButtonWrap>
    </Form>
  );
}

export default EditCommentForm;

const Form = styled.form``;

const EditCommentTextarea = styled(TextareaBox)`
  height: 80px;
`;

const EditButtonWrap = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  padding: 12px 23px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 600;
  border-radius: 8px;
  color: #737373;
  background: #fff;
`;

const EditCommentSubmitButton = styled(SubmitButton)`
  margin: 0;
`;
