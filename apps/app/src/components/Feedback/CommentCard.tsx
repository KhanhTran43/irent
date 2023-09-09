import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi.json';
import ReactTimeAgo from 'react-time-ago';
import styled from 'styled-components';

import { Avatar } from '../Common/Avatar';

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(vi);

type CommentCardProps = {
  name: string;
  content: string;
  timestamp: number;
};

export const CommentCard = (props: CommentCardProps) => {
  const { name, content, timestamp } = props;

  return (
    <Container>
      <div>
        <Avatar name={name} />
      </div>
      <Body>
        <Sender>{name}</Sender>
        <Content>{content}</Content>
        <Time>
          <ReactTimeAgo date={timestamp} locale="vi" timeStyle="twitter" />
        </Time>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 24px;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 0;
  min-height: 120px;

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const Body = styled.div``;

const Sender = styled.span`
  display: block;
  font-weight: bold;
`;

const Content = styled.p``;

const Time = styled.p`
  position: absolute;
  top: 0;
  right: 24px;
  font-style: italic;
`;

