import { MenuSquareIcon } from 'lucide-react'
import { Link } from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    return (
        // <!-- Navigation -->
        <nav className="fixed w-screen z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <i className="fas fa-cube text-indigo-600 text-2xl mr-2"></i>
                            <Link to="/" className="text-xl font-bold text-gray-900">PaaS</Link>
                        </div>
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        {/* <Link to="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Home</Link> */}
                        <a href="/#pricing" className="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Pricing</a>
                        <a href="/#features" className="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Features</a>
                        <a href="/#contact" className="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Contact</a>
                        <Link to="/login" className="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Login</Link>
                        <Link to="/register" className="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Sign up</Link>
                    </div>
                    <div className="md:hidden flex items-center mr-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger><i><MenuSquareIcon /></i></DropdownMenuTrigger>
                            <DropdownMenuContent className='[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                                {/* <DropdownMenuLabel><Link to="/" className="hover:text-indigo-600 px-3 text-sm font-medium">Home</Link></DropdownMenuLabel> */}
                                <DropdownMenuItem><a href="/#pricing" className="hover:text-indigo-600 px-3 text-sm font-medium">Pricing</a></DropdownMenuItem>
                                <DropdownMenuItem><a href="/#features" className="hover:text-indigo-600 px-3 text-sm font-medium">Features</a></DropdownMenuItem>
                                <DropdownMenuLabel><a href="/#contact" className="hover:text-indigo-600 px-3 text-sm font-medium">Contact</a></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link to="/login" className="hover:text-indigo-600 px-3 text-sm font-medium">Login</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link to="/register" className="hover:text-indigo-600 px-3 text-sm font-medium">Sign up</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default Header