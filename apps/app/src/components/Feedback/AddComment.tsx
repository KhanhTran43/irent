import { useState } from 'react';
import styled from 'styled-components';

import { Avatar } from '../Common/Avatar';
import { Button } from '../Common/Button';

export const AddComment = () => {
  const [comment, setComment] = useState('');

  const addComment = () => {
    // TODO: Hữu Tình làm tiếp nha
  }

  return (
    <Container>
      <div>
        <Avatar name="Chiến Tho" />
      </div>
      <Textarea placeholder="Leave a comment..." onChange={(e) => setComment(e.target.value)} />
      <Button onClick={() => addComment()}>Bình luận</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 16px;
  gap: 24px;
  align-items: center;
`;

const Textarea = styled.textarea`
  border-radius: 8px;
  padding: 16px;
  min-height: 80px;
  display: block;
  width: 100%;
  resize: none;
`;

