import { produce } from 'immer';
import { useState } from 'react';
import styled from 'styled-components';

import { CommentModel } from '@/models/comment.model';

import { AddComment } from './AddComment';
import { CommentCard } from './CommentCard';

export type CommentSectionProps = {
  data?: CommentModel[];
};

export const CommentSection = ({ data = [] }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentModel[]>(data);

  return (
    <CommentRoot>
      <AddComment
        onCommentResolved={(comment) =>
          setComments(
            produce((comments) => {
              comments.unshift(comment);
            }),
          )
        }
      />

      <List>
        {comments.map((it) => (
          <CommentCard key={it.id} content={it.content} name={it.senderName} timestamp={it.timestamp} />
        ))}
      </List>
    </CommentRoot>
  );
};

const CommentRoot = styled.div`
  width: 100%;
`;

const List = styled.div`
  padding: 0 10px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
