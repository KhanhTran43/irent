import { useState } from 'react';
import styled from 'styled-components';

import { CommentModel } from '@/models/comment.model';

import { AddComment } from './AddComment';
import { CommentCard } from './CommentCard';

const mockComments: CommentModel[] = [
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 1,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 4,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 3,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content:
      'Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình',
    timestamp: 1694265908968,
    id: 5,
    warehouseId: 1,
  },
];

export const ListComment = () => {
  const [comments, setComments] = useState<CommentModel[]>(mockComments);

  return (
    <>
      <AddComment onCommentResolved={(comment) => setComments([...comments, comment])} />

      <List>
        {comments.map((it) => (
          <CommentCard key={it.id} content={it.content} name={it.senderName} timestamp={it.timestamp} />
        ))}
      </List>
    </>
  );
};

const List = styled.div`
  padding: 0 10px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
