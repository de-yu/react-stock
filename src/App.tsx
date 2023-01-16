import React, {useState} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Outlet, useNavigate  } from "react-router-dom";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Nav, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { Callout, Link, mergeStyleSets, Text, FontWeights } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch} from '@/app/store'
import { DefaultButton } from '@fluentui/react/lib/Button';
import { getLoginToken } from '@/app/MemberSlice';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { encryptoPassword } from '@/utility/utility';
const navStyles: Partial<INavStyles> = {
  root: {
    width: 300,
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups: INavLinkGroup[] = [ {
  name: 'Basic components',
  expandAriaLabel: 'Show more Basic components',
  links: [
    {
      key: 'test',
      name: 'test',
      url: '',
    },
    {
      key: 'Counter',
      name: 'Counter',
      url: '',
    },
    {
      key: 'Market',
      name: 'Market',
      url: ''
    },
    {
      key: 'StockRecord',
      name: 'StockRecord',
      url: ''
    }
  ],
},
 
];



function App() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const buttonId = useId('callout-button');

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const handleOnClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item) {
      navigate('/'+item.name)
    }
  }

  const loginAction = () => {
    dispatch(getLoginToken({
      account,
      password: encryptoPassword(password)
    }))
  }

  const onChangeAccount = 
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setAccount(newValue ?? '');
    };
  const onChangePassowrd = 
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setPassword(newValue ?? '');
    };


  return (
    <div className="App">
      <div className={styles.navBar}>
      <Nav
        onLinkClick={handleOnClick}
        selectedKey="key3"
        ariaLabel="Nav basic example"
        styles={navStyles}
        groups={navLinkGroups}
      />
      </div>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.login}>
            <DefaultButton
            id={buttonId}
              text='登入'
            />
            <Callout
              className={styles.loginPanel}
              role="dialog"
              target={`#${buttonId}`}
            >
              
              <TextField label="帳號" value={account} onChange={onChangeAccount}/>
              <TextField
                label="密碼"
                type="password"
                canRevealPassword
                onChange={onChangePassowrd}
              />
               <DefaultButton
                  text='登入'
                  onClick={loginAction}
                />
            </Callout>
          </div>
        </div>
        <div className={styles.content + ' ms-bgColor-gray30'}>
          <Outlet />
        </div>
        
      </div>
    </div>
  );
}


export default App;
