import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { apiService } from '../../services/api-service';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';
import { API_LANGUAGE, API_CONSTANT_PUBLIC } from '../../constant/api-path';

import type { ApiResponse } from '../../libs/types/api-response';
import type { LanguageResponse } from '../../libs/types/language-response';
import type { LanguagePopoverProps } from '../components/language-popover';
import type { ConstantResponse } from '../../libs/types/constant-response';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import type { PaginationResponse } from '../../libs/types/pagination-response';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const layoutQuery: Breakpoint = 'lg';
  const [workspaces, setWorkspaces] = useState<WorkspacesPopoverProps['data']>([]);
  const [languages, setLanguages] = useState<LanguagePopoverProps['data']>([]);

  useEffect(() => {
    apiService
      .get<ApiResponse<PaginationResponse<LanguageResponse>>>(API_LANGUAGE)
      .then((res) => {
        const mapped = res.data.datas.map((item) => ({
          code: item.code,
          name: item.name,
          url: item.url,
        }));
        setLanguages(mapped);
      })
      .catch((err) => {
        console.error('layout.tsx | Error', err);
      });
  }, []);

  useEffect(() => {
    apiService
      .get<ApiResponse<PaginationResponse<ConstantResponse>>>(
        `${API_CONSTANT_PUBLIC}?groupCode=WORKSPACE`
      )
      .then((res) => {
        const mapped = res.data.datas.map((item) => ({
          id: item.code,
          name: item.value,
          logo: '',
          plan: '',
        }));
        setWorkspaces(mapped);
      })
      .catch((err) => {
        console.error('layout.tsx | Error', err);
      });
  }, []);

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <LanguagePopover data={languages} />
                <NotificationsPopover data={_notifications} />
                <AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
