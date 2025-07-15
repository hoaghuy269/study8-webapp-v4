import type { IconButtonProps } from '@mui/material/IconButton';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { setLocale } from '../../libs/locale/locale';
import { useUserProfile } from '../../hooks/use-user-profile';

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
  data?: {
    code: string;
    name: string;
    url: string;
  }[];
};

export function LanguagePopover({ data = [], sx, ...other }: LanguagePopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { userProfile } = useUserProfile();
  const initLangCode = userProfile?.language || 'vi';
  const [langCode, setLangCode] = useState<string>(initLangCode);

  const currentLang = useMemo(() => data.find((lang) => lang.code === langCode) || data[0], [data, langCode]);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeLang = useCallback(
    (newLang: string) => {
      setLangCode(newLang);
      setLocale(newLang as any);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  const renderFlag = (label?: string, icon?: string) => (
    <Box
      component="img"
      alt={label}
      src={icon}
      sx={{ width: 26, height: 20, borderRadius: 0.5, objectFit: 'cover' }}
    />
  );

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        {...other}
      >
        {renderFlag(currentLang?.name, currentLang?.url)}
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data?.map((option) => (
            <MenuItem
              key={option.code}
              selected={option.code === currentLang?.code}
              onClick={() => handleChangeLang(option.code)}
            >
              {renderFlag(option.name, option.url)}
              {option.name}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
