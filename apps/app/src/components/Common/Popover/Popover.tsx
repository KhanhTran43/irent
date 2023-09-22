import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import styled from 'styled-components';

type PopoverProps = {
  children: ReactNode;
  content: ReactNode;
  isPopoverOpen?: boolean;
  handleInteractOutside?: () => void;
  handleClickTrigger?: () => void;
  handleOpenChange?: (isOpen: boolean) => void;
} & RadixPopover.PopoverContentProps;

const NoOutlineContent = styled(RadixPopover.Content)`
  outline: none;
`;

const Root = styled(RadixPopover.Root)``;

export function Popover(props: PopoverProps) {
  return (
    <Root open={props.isPopoverOpen} onOpenChange={props.handleOpenChange}>
      <RadixPopover.Trigger asChild onClick={props.handleClickTrigger}>
        {props.children}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <NoOutlineContent {...props} onInteractOutside={props.handleInteractOutside}>
          {props.content}
        </NoOutlineContent>
      </RadixPopover.Portal>
    </Root>
  );
}
