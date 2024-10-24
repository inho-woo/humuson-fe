import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AttachMoney,
  BarChart,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Home,
  PieChart,
  Send,
} from "@material-ui/icons";
import { CalendarMonth, Groups3, TextSnippet } from "@mui/icons-material";
import { useRouter } from "next/router";
import { HeaderInterface } from "./header";


const Header= (props: HeaderInterface.HeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [subOpen, setSubOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const router = useRouter();


  const toggleDrawer =
    (open: boolean) =>
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ): void => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const handleSubClick = (): void => {
    setSubOpen(!subOpen);
  };

  const handleMessageClick = (): void => {
    setMessageOpen(!messageOpen);
  };

  const handleHomeClick = () => {
    router.push('/');
  };


  const handleNoticeClick = () => {
    router.push('/notice');
  };


  // 하위 리스트 데이터
  const mainListItems = [
    { text: "캠페인", icon: <Groups3 /> },
    { text: "템플릿", icon: <TextSnippet /> },
    { text: "발송 관리", icon: <PieChart /> },
    { text: "리포트", icon: <PieChart /> },
    { text: "통계", icon: <BarChart /> },
    { text: "정산", icon: <AttachMoney /> },
    { text: "회원", icon: <Groups3 /> },
    { text: "PUSH 사용자", icon: <Groups3 /> },
    { text: "대시보드", icon: <Dashboard /> },
  ];
  const DrawerList = (
    <Box sx={{ width: "100%", minWidth:"250px" }}>
      <List>
        <ListItemButton onClick={handleSubClick}>
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText primary="게시판" />
          {subOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subOpen} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 4 }} onClick={handleNoticeClick}>
            <ListItemText primary="공지사항" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleHomeClick}>
            <ListItemText primary="Q&A" />
          </ListItemButton>
        </Collapse>
        <ListItemButton onClick={handleMessageClick}>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="메세지" />
          {messageOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={messageOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleHomeClick}>
              <ListItemText primary="발송하기" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {mainListItems.map((item) => (
          <ListItemButton key={item.text} sx={{ pl: 4 }} onClick={handleHomeClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#008850" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ style: { marginTop: "3.5%" } }}
            >
              {DrawerList}
            </Drawer>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                TMS
              </Typography>
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Total Marketing Server
              </Typography>
            </Box>
            <Avatar src=""></Avatar>
            <Button color="inherit">휴머스온</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid",
          borderColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ marginLeft: "20%" }}>{props.title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderColor: "gray",
            padding: "0 10px",
          }}
        >
          <IconButton sx={{ marginRight: "10px" }} onClick={handleHomeClick}>
            <Home/>
          </IconButton>
          <Typography>{props.title ? "/ " + props.subTitle + " /" : ""}</Typography>
          <Typography sx={{ marginLeft: "10px" }}>{props.title ? props.title : ""}</Typography>
        </Box>
      </Box>
    </>
  );
}
export default Header;