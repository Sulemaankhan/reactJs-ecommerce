import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import ManuBar from './ManuBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useSearch } from '../SearchContext';
import { useAuth } from '../AuthContext';

export default function HeaderBar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { term, setTerm } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '25ch',
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
            onClick={() => navigate('/shop')}
          >
            MyShop
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by product name…"
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                navigate('/shop');
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {isAuthenticated ? (
            <>
              <Typography sx={{ mx: 1 }}>
                {user?.username || 'User'}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            aria-label="cart"
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <ManuBar></ManuBar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
