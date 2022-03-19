import { UncontrolledPopover, ListGroupItem, PopoverHeader, PopoverBody, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './Header.css';

function Header(props) {
    var clickWishListItem = (movieTitle) => {
        props.wishListClick(movieTitle)
    }
    var wishListArray = [];
    for (let i = 0; i < props.movieList.length; i++) {
        wishListArray.push(
            <ListGroupItem onClick={() => clickWishListItem(props.movieList[i].title)}>
                <span>
                    <img style={{ width: '25%' }} src={props.movieList[i].img} alt="img" /><span key={i}>{props.movieList[i].title}</span>
                </span>
            </ListGroupItem>
        )
    }

    return (
        <Nav>
            <NavItem>
                <NavLink active href="#">
                    <img src="/img/logo.png" alt="Logo" />
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" className="myNavBar">
                    Last Releases
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" >
                    <div>
                        <Button
                            id="PopoverFocus"
                            type="button">
                            {props.count} Films
                        </Button>
                        <UncontrolledPopover placement="bottom" target="PopoverFocus" trigger="click">
                            <PopoverHeader>
                                Wishlist
                            </PopoverHeader>
                            <PopoverBody>
                                {wishListArray}
                            </PopoverBody>
                        </UncontrolledPopover>
                    </div>

                </NavLink>
            </NavItem>
        </Nav>
    )
}
export { Header };