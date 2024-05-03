import React from 'react';

import { DEFAULT_TAGS, ITag } from '../types';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TTagSelectorProps = {
  currentTag: ITag | null;
  setTag: (tags: ITag) => void;
};

export const TagSelector = ({ currentTag, setTag }: TTagSelectorProps) => {
  const [position, setPosition] = React.useState('');

  const changeTag = (value: string) => {
    setPosition(value);

    const tagIndex = DEFAULT_TAGS.findIndex((e) => e.name === value);
    setTag(DEFAULT_TAGS[tagIndex]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center focus-visible:outline-none">
        {currentTag ? (
          <Badge variant="default" className={currentTag.color}>
            {currentTag.name}
          </Badge>
        ) : (
          <Badge variant="outline" className="whitespace-nowrap">
            Select Tag
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Tag</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(e) => changeTag(e)}
        >
          {DEFAULT_TAGS.map((tag, index) => {
            return (
              <DropdownMenuRadioItem key={index} value={tag.name}>
                <Badge variant="default" className={tag.color}>
                  {tag.name}
                </Badge>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
