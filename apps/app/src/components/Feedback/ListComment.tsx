import styled from 'styled-components';

import { CommentModel } from '@/models/comment.model';

import { AddComment } from './AddComment';
import { CommentCard } from './CommentCard';

export const ListComment = () => {
  const data: CommentModel[] = [
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
  return (
    <>
      <AddComment />

      <List>
        {data.map((it) => (
          <CommentCard key={it.id} content={it.content} name={it.senderName} timestamp={it.timestamp} />
        ))}
      </List>
    </>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

