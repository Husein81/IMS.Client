import App from '../layout/App'
import { createBrowserRouter, RouteObject } from "react-router-dom"
import HomePage from '../layout/HomePage';
import ProductsPage from '../../components/Products/ProductsPage';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import CategoriesPage from '../../components/Categories/CategoriesPage';
import InvoicePage from '../../components/Invoice/InvoicePage';
import OrderPage from '../../components/Order/OrderPage';
import InvoiceDoc from '../../components/Invoice/InvoiceDoc';
import CustomerPage from '../../components/Customer/CustomerPage';
import SupplierPage from '../../components/Supplier/SupplierPage';
import CompletedInvoicePage from '../../components/Invoice/CompletedInvoice/CompletedInvoicePage';

export const routes : RouteObject[] = [
   { 
        path:'/',
        element:<App/>,
        children: [
            {path:' ', element:<HomePage/>},
            {path:'dashboard', element:<DashboardPage/>},
            {path:'products', element:<ProductsPage/>},
            {path:'categories', element:<CategoriesPage/>},
            {path:'orders', element:<OrderPage/>},
            {path:'invoice', element:<InvoicePage/>},
            {path:'invoice/:id', element:<InvoiceDoc />},
            {path:'customers', element:<CustomerPage/>},
            {path:'suppliers', element:<SupplierPage/>},
            {path:'/completedInvoice',element:<CompletedInvoicePage/>},
            {path:'*', element:<DashboardPage/>}
        ]
    }
]
export const router = createBrowserRouter(routes);