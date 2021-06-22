import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './_header-base.scss';

import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  SkeletonText,
  SwitcherDivider,
  SwitcherItem,
  Switcher,
  TooltipDefinition,
} from 'carbon-components-react';
import { NotificationFilled20, Home20 } from '@carbon/icons-react';

const HeaderBase = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const tooltipProp = {
    tooltipText: 'User Profile',
    align: 'end',
  };

  useEffect(() => {
    axios
      .get('http://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/docs/instances/master?userId=003407631')
      .then((response) => {
        setUserInfo({
          user: {
            displayName: response.data.content.identity_info.nameDisplay,
            email: response.data.content.identity_info.mail[0],
            role: response.data.content.identity_info.role,
            orgTitle: response.data.content.identity_info.org.title,
            orgUnit: response.data.content.identity_info.org.unit,
            location: response.data.content.identity_info.address.business.location,
          },
        });
      })
      .catch((error) => {
        JSON.stringify('error: ' + error);
      });
  }, []);

  let userPanel = (
    <div style={{ margin: '1rem 0 -1rem 1rem' }}>
      <SkeletonText paragraph={true} lineCount={3} width="90%" />
      <SwitcherDivider style={{ marginTop: '0.5rem' }} />
      <SkeletonText paragraph={true} lineCount={2} width="90%" />
    </div>
  );
  if (userInfo) {
    userPanel = Object.keys(userInfo.user).map((userKey) => {
      return [...Array(userInfo.user[userKey])].map((userValue, i) => {
        return (
          <>
            {userKey === 'orgTitle' ? <SwitcherDivider style={{ marginTop: '0.5rem' }} /> : null}
            {userKey === 'displayName' ? (
              <SwitcherItem isSelected key={i} aria-label={userValue} style={{ pointerEvents: 'none' }}>
                {userValue}
              </SwitcherItem>
            ) : (
              <SwitcherItem key={i} aria-label={userValue} style={{ pointerEvents: 'none' }}>
                {userValue}
              </SwitcherItem>
            )}
          </>
        );
      });
    });
  }

  const showUserInfoHandler = () => {
    setShowInfo(!showInfo);
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              isCollapsible
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="IBM">
              Notification Hub
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">21.S6.21 | LOCAL</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <TooltipDefinition {...tooltipProp}>
                <HeaderGlobalAction isActive={showInfo} aria-label="User" onClick={() => showUserInfoHandler()}>
                  <img
                    src="https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/igor.romero@ibm.com?def=null&amp;type=bp"
                    alt="igor.romero@ibm.comprofile"
                    style={{ height: '30px', borderRadius: '100%' }}
                  />
                </HeaderGlobalAction>
              </TooltipDefinition>
              <HeaderPanel aria-label="Header Panel" className="headerPanel" expanded={showInfo}>
                <Switcher aria-label="Switcher Container">{userPanel}</Switcher>
              </HeaderPanel>
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" isRail expanded={isSideNavExpanded}>
              <SideNavItems>
                <SideNavLink renderIcon={Home20} element={Link} to="/">
                  Home
                </SideNavLink>
                <SideNavLink renderIcon={NotificationFilled20} element={Link} to="/notifRule">
                  Notification Rule
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};

export default HeaderBase;
