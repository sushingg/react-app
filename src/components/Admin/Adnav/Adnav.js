import React, { Component,useState } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Grid,
  Dropdown 
} from "semantic-ui-react";
import {  Link } from "react-router-dom";
//onClick={(e, { name }) => setActiveItem(name)}

const Adnav =  props => {
  const [activeItem, setActiveItem] = useState('');

  return (
  <Segment basic>
  <Menu secondary >
    <Menu.Item >
      <Header as='h3'>TechE</Header>
    </Menu.Item>
    <Menu.Menu position='right'>
      <Menu.Item as={Dropdown} text='Options'>
            <Dropdown.Menu>
              <Dropdown.Item><i class="setting icon"></i>setting</Dropdown.Item>
              <Dropdown.Item><i class="sign out icon"></i>Sing out</Dropdown.Item>
            </Dropdown.Menu>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
    <Grid>
      <Grid.Column width={3}>
        <Menu vertical  fulid>

          <Menu.Item>
             <Header as='h4'>Menu</Header>
          </Menu.Item>

          <Menu.Item>
            Products
            <Menu.Menu>
              <Menu.Item name='padd' active={activeItem === 'padd'} onClick={(e, { name }) => setActiveItem(name)}>
                Add
              </Menu.Item>
              <Menu.Item name='plist' active={activeItem === 'plist'} onClick={(e, { name }) => setActiveItem(name)}>
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Orders
            <Menu.Menu>
              <Menu.Item name='olist' active={activeItem === 'olist'} onClick={(e, { name }) => setActiveItem(name)}>
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Cetegories
            <Menu.Menu>
              <Menu.Item name='cadd' active={activeItem === 'cadd'} onClick={(e, { name }) => setActiveItem(name)}>
                Add
              </Menu.Item>
              <Menu.Item name='clist' active={activeItem === 'clist'} onClick={(e, { name }) => setActiveItem(name)}>
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Users
            <Menu.Menu>
              <Menu.Item name='ulist' active={activeItem === 'ulist'} onClick={(e, { name }) => setActiveItem(name)}>
                List
              </Menu.Item>
              <Menu.Item name='uedit' active={activeItem === 'uedit'} onClick={(e, { name }) => setActiveItem(name)}>
                Edit
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>Settings</Menu.Item>
          <Menu.Item name='setting' active={activeItem === 'setting'} onClick={(e, { name }) => setActiveItem(name)}><Icon name='settings'/>General settings</Menu.Item>
          <Menu.Item name='gswtting' active={activeItem === 'gswtting'} onClick={(e, { name }) => setActiveItem(name)}><Icon name='users'/>Account Settings</Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={(e, { name }) => setActiveItem(name)}><Icon name='sign out'/>Logout</Menu.Item>
          
        </Menu>
        
        </Grid.Column>

        <Grid.Column stretched width={13}>
          <Segment>
            {props.children}
          </Segment>
        </Grid.Column>
      </Grid>

    </Segment>

  )
}
export default Adnav;
