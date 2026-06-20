import styled from 'styled-components';
import FormField from '../form/FormField';
import TextareaBox from '../form/TextareaBox';
import SubmitButton from '../form/SubmitButton';
import { DEVICE } from '../../styles/breakpoints';

function CommentForm({ value, onChange, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      <FormField label="문의하기" id="comment" labelSize={16}>
        <CommentTextarea
          id="comment"
          value={value}
          onChange={onChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
      </FormField>
      <CommentSubmitButton type="submit" disabled={!value.trim()}>
        등록
      </CommentSubmitButton>
    </Form>
  );
}

export default CommentForm;

const Form = styled.form``;

const CommentTextarea = styled(TextareaBox)`
  height: 104px;

  @media ${DEVICE.tablet} {
    font-size: 14px;
  }
`;

const CommentSubmitButton = styled(SubmitButton)`
  margin-top: 16px;
  margin-left: auto;
`;
