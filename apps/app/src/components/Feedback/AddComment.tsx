import { isEmpty } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

import { CommentModel } from '@/models/comment.model';

import { Avatar } from '../Common/Avatar';
import { Button } from '../Common/Button';
import { TextAreaAutoSize } from '../Common/TextArea';

type AddCommentProp = {
  onCommentResolved?: (comment: CommentModel) => void;
};

export const AddComment = ({ onCommentResolved }: AddCommentProp) => {
  const [comment, setComment] = useState('');

  const handleCommentSent = () => {
    if (!isEmpty(comment)) {
      onCommentResolved?.({ content: comment, id: Math.random(), senderName: 'Mock user', timestamp: Date.now() });
      setComment('');
    }
  };

  return (
    <Container>
      <div>
        <Avatar name="Chiến Tho" />
      </div>
      <Textarea
        placeholder="Leave a comment..."
        rows={1}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSent}>Bình luận</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 16px;
  gap: 24px;
  align-items: center;
`;

const Textarea = styled(TextAreaAutoSize)`
  border-radius: 8px;
  padding: 16px;
  display: block;
  width: 100%;
  resize: none;
`;
