import{Routes, Route, Navigate}from 'react-router-dom';
import { Home, Login , Register, Products,PrivateRoute,Sales,Inventory} from '../index';

export function MyRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute/>}> 
          <Route path="/home" element={<Home/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/profile' element={<h1>profile</h1>}/>
          {/*<Route path='*' element={<Navigate to="/"/>}/>*/}
        </Route>

      </Routes>
  );
}