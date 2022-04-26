import { Anchor, Divider, Group, Navbar, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import Logo from '../logo'

const links = [
  { title: 'Url Shortner', path: '/'},
  { title: 'Text Upload', path: '/text'},
  { title: 'Media Upload', path: '/media'},
  { title: 'View', path: '/get'}
]

export default function Nav() {
  return <Navbar style={{flex: '0 0 15%', paddingLeft: '1em'}}>
    <Title children={<Logo/>}/>
    <Divider/>
    <Navbar.Section grow>
      <Group direction="column" align='stretch' sx={{paddingRight: '10px'}}>
        {links.map((link) =>
          <Anchor component={NavLink} variant="text" key={link.path} to={link.path} children={link.title}
            sx={(theme) => ({
              padding: '5px',
              '&:hover': {
                backgroundColor: theme.fn.rgba(theme.colors.blue[8], .7),
                borderRadius: 5
              }
            })}
          />
        )}
      </Group>
    </Navbar.Section>
  </Navbar>
}
